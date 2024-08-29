import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class Footnotes extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("footnotes", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Footnotes",
        tooltip: true,
        withText: true,
        class: "ck-button_footnotes",
      });

      view.on("execute", () => {
        // Open a custom dialog to capture the footnote details.
        const headerText = prompt("Enter header text:");
        const titleText = prompt("Enter title text:");
        const url = prompt("Enter URL:");

        if (headerText && titleText && url) {
          const footnoteNumber = this._getNextFootnoteNumber();
          const isFirstFootnote = footnoteNumber === 1;

          const footnoteLinkMarkup = `<sup id="footnote-ref-${footnoteNumber}"><a href="#footnote-${footnoteNumber}">[${footnoteNumber}]</a></sup>`;

          // Include the "Sources" heading if this is the first footnote
          const footnoteContentMarkup = `
  ${isFirstFootnote ? "<h3><strong>Sources</strong></h3>" : ""}
  <div id="footnote-${footnoteNumber}" class="footnote">
    ${footnoteNumber}. <strong>${headerText}</strong>. <a href="${url}" target="_blank">${titleText}</a>
  </div>
`;

          // Insert the footnote reference at the current cursor position
          const viewFragmentLink =
            editor.data.processor.toView(footnoteLinkMarkup);
          const modelFragmentLink = editor.data.toModel(viewFragmentLink);
          editor.model.insertContent(modelFragmentLink);

          // Append the footnote content to the bottom of the editor
          this._appendFootnoteContent(editor, footnoteContentMarkup);
        }
      });

      return view;
    });
  }

  _getNextFootnoteNumber() {
    const editorData = this.editor.getData();
    const footnoteMatches = editorData.match(/<sup id="footnote-ref-(\d+)">/g);
    const footnoteNumbers = footnoteMatches
      ? footnoteMatches.map((match) =>
          parseInt(match.match(/footnote-ref-(\d+)/)[1])
        )
      : [];
    return footnoteNumbers.length > 0 ? Math.max(...footnoteNumbers) + 1 : 1;
  }

  _appendFootnoteContent(editor, footnoteContentMarkup) {
    const editorData = editor.getData();

    // Append the footnote content at the bottom of the editor
    const updatedData = `${editorData}<div class="footnotes-section">${footnoteContentMarkup}</div>`;
    editor.setData(updatedData);
  }
}
