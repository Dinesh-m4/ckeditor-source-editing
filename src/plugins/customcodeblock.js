import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class CustomCodeBlock extends Plugin {
  init() {
    const editor = this.editor;

    // Add the 'codeBlock' button in the toolbar
    editor.ui.componentFactory.add("customCodeBlock", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Insert Code Block",
        tooltip: true,
        withText: true,
        class: "ck-button_codeblock",
      });

      view.on("execute", () => {
        // Define the HTML structure for the code block
        const codeBlockMarkup = `
          <pre style="
              padding: 1rem; 
              margin-bottom: 1.5rem;
              background-color: #ffffff;
              border: 1px solid #D1D5DB; 
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
              border-radius: 0.75rem;">
            <code>Enter your code here...</code>
          </pre>
        `;

        // Convert the HTML to CKEditor's model
        const viewFragment = editor.data.processor.toView(codeBlockMarkup);
        const modelFragment = editor.data.toModel(viewFragment);

        // Insert the code block into the editor content
        editor.model.change((writer) => {
          editor.model.insertContent(
            modelFragment,
            editor.model.document.selection
          );
        });
      });

      return view;
    });
  }
}
