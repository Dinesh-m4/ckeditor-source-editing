import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class Footnotes extends Plugin {
  init() {
    const editor = this.editor;

    // Inject modal HTML into the page when the plugin is initialized
    const modalHTML = `
      <div id="footnoteModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
        
          <label for="headerText">Header Text:</label>
          <input type="text" id="headerText" name="headerText"><br><br>
          <label for="titleText">Title Text:</label>
          <input type="text" id="titleText" name="titleText"><br><br>
          <label for="url">URL:</label>
          <input type="text" id="url" name="url"><br><br>
          <button class="success" id="submitFootnote">OK</button>
        </div>
      </div>
    `;

    // Inject the modal into the document body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add the CSS for the modal
    const style = document.createElement("style");
    style.innerHTML = `
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      padding-top: 200px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 10px;
      border: 1px solid #888;
      width: 40%;
    }
  
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
  
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  
    /* OK Button Styles */
    #submitFootnote {
      background-color: #4CAF50; /* Green background */
      color: white; /* White text */
      border: 2px solid #4CAF50; /* Border with same color as background */
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px; /* Rounded corners */
      transition: background-color 0.3s, border-color 0.3s; /* Smooth transition */
    }
  
    /* Hover effect for OK Button */
    #submitFootnote:hover {
      background-color: white; /* White background on hover */
      color: #4CAF50; /* Green text */
      border-color: #4CAF50; /* Border color remains green */
    }
    `;
    document.head.appendChild(style);

    // Add the footnotes button to CKEditor toolbar
    editor.ui.componentFactory.add("footnotes", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: "Footnotes",
        tooltip: true,
        withText: true,
        class: "ck-button_footnotes",
      });

      view.on("execute", () => {
        // Show the modal dialog when the button is clicked
        const modal = document.getElementById("footnoteModal");
        const closeButton = modal.querySelector(".close");
        const submitButton = modal.querySelector("#submitFootnote");

        modal.style.display = "block"; // Show modal

        // Close modal when 'x' is clicked
        closeButton.onclick = function () {
          modal.style.display = "none";
        };

        // Handle form submission
        // submitButton.onclick = () => {
        //   const headerText = document.getElementById("headerText").value;
        //   const titleText = document.getElementById("titleText").value;
        //   const url = document.getElementById("url").value;

        //   if (headerText && titleText && url) {
        //     const footnoteNumber = this._getNextFootnoteNumber();
        //     const isFirstFootnote = footnoteNumber === 1;
        //     const dataString = JSON.stringify({ headerText, titleText, url });

        //     const footnoteLinkMarkup = `<sup id="footnote-ref-${footnoteNumber}"><a href="#footnote-${footnoteNumber}" data-custom=${dataString}>[${footnoteNumber}]</a></sup>`;

        //     const footnoteContentMarkup = `
        //       ${
        //         isFirstFootnote
        //           ? "<h3 id='footnotes-source'><strong>Sources</strong></h3>"
        //           : ""
        //       }
        //       <div id="footnote-${footnoteNumber}" class="footnote">
        //         ${footnoteNumber}. <strong>${headerText}</strong>. <a href="${url}" target="_blank">${titleText}</a>
        //       </div>`;

        //     // Insert footnote link and content
        //     const viewFragmentLink =
        //       editor.data.processor.toView(footnoteLinkMarkup);
        //     const modelFragmentLink = editor.data.toModel(viewFragmentLink);
        //     editor.model.insertContent(modelFragmentLink);

        //     this._appendFootnoteContent(editor, footnoteContentMarkup);

        //     // Clear input fields after successful submission
        //     document.getElementById("headerText").value = "";
        //     document.getElementById("titleText").value = "";
        //     document.getElementById("url").value = "";

        //     modal.style.display = "none"; // Close modal after submission
        //   }
        // };
        submitButton.onclick = () => {
          const headerText = document.getElementById("headerText").value;
          const titleText = document.getElementById("titleText").value;
          const url = document.getElementById("url").value.trim();

          // Check that only the URL field is not empty (after trimming)
          if (url) {
            const footnoteNumber = this._getNextFootnoteNumber();
            const isFirstFootnote = footnoteNumber === 1;
            const dataString = JSON.stringify({ headerText, titleText, url });

            const footnoteLinkMarkup = `<sup id="footnote-ref-${footnoteNumber}"><a href="#footnote-${footnoteNumber}" data-custom=${dataString}>[${footnoteNumber}]</a></sup>`;

            const footnoteContentMarkup = `
              ${
                isFirstFootnote
                  ? "<h3 id='footnotes-source'><strong>Sources</strong></h3>"
                  : ""
              }
              <div id="footnote-${footnoteNumber}" class="footnote">
                ${footnoteNumber}. <strong>${headerText}</strong>. <a href="${url}" target="_blank">${titleText}</a>
              </div>`;

            // Insert footnote link and content
            const viewFragmentLink =
              editor.data.processor.toView(footnoteLinkMarkup);
            const modelFragmentLink = editor.data.toModel(viewFragmentLink);
            editor.model.insertContent(modelFragmentLink);

            this._appendFootnoteContent(editor, footnoteContentMarkup);

            // Clear input fields after successful submission
            document.getElementById("headerText").value = "";
            document.getElementById("titleText").value = "";
            document.getElementById("url").value = "";

            modal.style.display = "none"; // Close modal after submission
          }
        };

        // Close modal if user clicks outside of it
        window.onclick = function (event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };
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
