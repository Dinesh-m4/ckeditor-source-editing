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
        const headerText = prompt("Enter header text:");
        const titleText = prompt("Enter title text:");
        const url = prompt("Enter URL:");

        if (headerText && titleText && url) {
          const footnoteNumber = this._getNextFootnoteNumber();
          const isFirstFootnote = footnoteNumber === 1;
          const dataString = JSON.stringify({
            headerText,
            titleText,
            url
          });
          const footnoteLinkMarkup = `<sup id="footnote-ref-${footnoteNumber}"><a href="#footnote-${footnoteNumber}" data-custom=${dataString}>[${footnoteNumber}]</a></sup>`;

          const footnoteContentMarkup = `
            <div id="footnote-${footnoteNumber}" class="footnote">
              ${footnoteNumber}. <strong>${headerText}</strong>. <a href="${url}" target="_blank">${titleText}</a>
            </div>
          `;

          const viewFragmentLink = editor.data.processor.toView(footnoteLinkMarkup);
          const modelFragmentLink = editor.data.toModel(viewFragmentLink);
          editor.model.insertContent(modelFragmentLink);

          this._appendFootnoteContent(editor, footnoteContentMarkup, isFirstFootnote);
        }
      });

      return view;
    });
  }

  _getNextFootnoteNumber() {
    const editorData = this.editor.getData();
    const footnoteMatches = editorData.match(/<sup id="footnote-ref-(\d+)">/g);
    const footnoteNumbers = footnoteMatches
      ? footnoteMatches.map((match) => parseInt(match.match(/footnote-ref-(\d+)/)[1]))
      : [];
    return footnoteNumbers.length > 0 ? Math.max(...footnoteNumbers) + 1 : 1;
  }

  _appendFootnoteContent(editor, footnoteContentMarkup, isFirstFootnote) {
    let editorData = editor.getData();

    // If this is the first footnote, add the Sources heading with the plus button
    if (isFirstFootnote) {
      const sourcesSection = `
        <h3>
          <strong>Sources</strong>
          <button id="toggle-footnotes" style="font-size: 20px; margin-left: 10px;">+</button>
        </h3>
        <div id="footnotes-section" style="display: none;">
          ${footnoteContentMarkup}
        </div>
        <script>
          document.getElementById('toggle-footnotes').addEventListener('click', function() {
            const footnotesSection = document.getElementById('footnotes-section');
            const isHidden = footnotesSection.style.display === 'none';
            footnotesSection.style.display = isHidden ? 'block' : 'none';
            this.textContent = isHidden ? '-' : '+';
          });
        </script>
      `;
      editorData = `${editorData}<div class="footnotes-section">${sourcesSection}</div>`;
    } else {
      // Append to existing footnotes section
      editorData = editorData.replace('</div>', `${footnoteContentMarkup}</div>`);
    }

    editor.setData(editorData);
  }
}
