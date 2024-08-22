/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import SelectAll from "@ckeditor/ckeditor5-select-all/src/selectall";
import FindandReplace from "@ckeditor/ckeditor5-find-and-replace/src/findandreplace";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices.js";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Font from "@ckeditor/ckeditor5-font/src/font";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import Link from "@ckeditor/ckeditor5-link/src/link.js";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting.js";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import FullScreen from "./fullscreen-plugin";
import { StrapiMediaLib } from "./strapi-medialib-plugin";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code";
import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
import Link from "@ckeditor/ckeditor5-link/src/link";
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";

class Editor extends ClassicEditor {}

function SpecialCharactersEmoji(editor) {
  editor.plugins.get("SpecialCharacters").addItems(
    "Emoji",
    [
      { title: "smiley face", character: "😊" },
      { title: "rocket", character: "🚀" },
      { title: "wind blowing face", character: "🌬️" },
      { title: "floppy disk", character: "💾" },
      { title: "heart", character: "❤️" },
      { title: "thumbs up", character: "👍" },
      { title: "star", character: "⭐" },
      { title: "clapping hands", character: "👏" },
      { title: "fire", character: "🔥" },
      { title: "party popper", character: "🎉" },
      { title: "sunglasses", character: "😎" },
      { title: "winking face", character: "😉" },
      { title: "thinking face", character: "🤔" },
      { title: "red apple", character: "🍎" },
      { title: "pencil", character: "✏️" },
    ],
    { label: "Emoticons" }
  );
}

function SpecialCharactersExtended(editor) {
  editor.plugins.get("SpecialCharacters").addItems("Mathematical", [
    { title: "alpha", character: "α" },
    { title: "beta", character: "β" },
    { title: "gamma", character: "γ" },
    { title: "delta", character: "δ" },
    { title: "epsilon", character: "ε" },
    { title: "pi", character: "π" },
    { title: "sigma", character: "σ" },
    { title: "theta", character: "θ" },
    { title: "infinity", character: "∞" },
    { title: "integral", character: "∫" },
    { title: "square root", character: "√" },
    { title: "approximately equal", character: "≈" },
    { title: "less than or equal to", character: "≤" },
    { title: "greater than or equal to", character: "≥" },
  ]);

  editor.plugins.get("SpecialCharacters").addItems("Currency", [
    { title: "dollar sign", character: "$" },
    { title: "euro sign", character: "€" },
    { title: "pound sign", character: "£" },
    { title: "yen sign", character: "¥" },
    { title: "rupee sign", character: "₹" },
    { title: "bitcoin sign", character: "₿" },
  ]);

  editor.plugins.get("SpecialCharacters").addItems("Arrows", [
    { title: "right arrow", character: "→" },
    { title: "left arrow", character: "←" },
    { title: "up arrow", character: "↑" },
    { title: "down arrow", character: "↓" },
    { title: "double-headed arrow", character: "↔" },
    { title: "curved arrow", character: "↩" },
    { title: "circular arrow", character: "↺" },
  ]);
}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Autoformat,
  Alignment,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  CKFinder,
  CKFinderUploadAdapter,
  CloudServices,
  CodeBlock,
  Essentials,
  Font,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  RemoveFormat,
  Link,
  AutoLink,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersEmoji,
  SpecialCharactersExtended,
  FullScreen,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  // Title,
  StrapiMediaLib,
  FindandReplace,
  SelectAll,
  Indent,
  IndentBlock,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "findandReplace",
      "SelectAll",
      "heading",
      "|",
      "fontFamily",
      "fontColor",
      "fontBackgroundColor",
      "fontSize",
      "alignment",
      "bold",
      "italic",
      "highlight",
      "link",
      "bulletedList",
      "numberedList",
      "subscript",
      "superscript",
      "underline",
      // "insertImage",
      "strapiMediaLib",
      "insertTable",
      "blockQuote",
      "mediaEmbed",
      "sourceEditing",
      "horizontalLine",
      "specialCharacters",
      "strikethrough",
      "codeBlock",
      "htmlSupport",
      "fullScreen",
      "undo",
      "redo",
      "code",
      "removeFormat",
      "outdent",
      "indent",
    ],
  },
  language: "en",
  image: {
    styles: ["alignLeft", "alignCenter", "alignRight"],
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        icon: "original",
      },
      {
        name: "resizeImage:50",
        value: "50",
        icon: "medium",
      },
      {
        name: "resizeImage:75",
        value: "75",
        icon: "large",
      },
    ],
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "imageTextAlternative",
      "toggleImageCaption",
      "|",
      "resizeImage:50",
      "resizeImage:75",
      "resizeImage:original",
      "|",
      "linkImage",
    ],
  },
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableCellProperties",
      "tableProperties",
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: /.*/,
        attributes: true,
        classes: true,
        styles: true,
      },
    ],
  },
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading4",
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4",
      },
    ],
  },
  htmlEmbed: {
    showPreviews: true,
    sanitizeHtml: (inputHtml) => {
      const outputHtml = sanitizeHtml(inputHtml);
      return {
        html: outputHtml,
        hasChanged: true,
      };
    },
  },
  fontFamily: {
    options: [
      "default",
      "Arial, Helvetica, sans-serif",
      "Courier New, Courier, monospace",
      "Georgia, serif",
      "Lucida Sans Unicode, Lucida Grande, sans-serif",
      "Tahoma, Geneva, sans-serif",
      "Times New Roman, Times, serif",
      "Trebuchet MS, Helvetica, sans-serif",
      "Verdana, Geneva, sans-serif",
      "JetBrains Mono, monospace",
      "Lato, Inter, sans-serif",
    ],
  },
  fontSize: {
    options: [
      {
        title: "Tiny",
        model: "10px",
        view: {
          name: "span",
          styles: {
            "font-size": "10px",
          },
        },
      },
      {
        title: "Small",
        model: "12px",
        view: {
          name: "span",
          styles: {
            "font-size": "12px",
          },
        },
      },
      {
        title: "Default",
        model: "16px",
        view: {
          name: "span",
          styles: {
            "font-size": "16px",
          },
        },
      },
      {
        title: "Big",
        model: "18px",
        view: {
          name: "span",
          styles: {
            "font-size": "18px",
          },
        },
      },
      {
        title: "Huge",
        model: "24px",
        view: {
          name: "span",
          styles: {
            "font-size": "24px",
          },
        },
      },
    ],
    supportAllValues: false, // Optional: set to true if you want to support custom values
  },

  link: {
    defaultProtocol: "http://",
    decorators: [
      {
        mode: "manual",
        label: "Open in a new tab",
        attributes: {
          target: "_blank",
        },
      },
      {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "download",
        },
      },
      {
        mode: "manual",
        label: "External link",
        attributes: {
          rel: "noopener noreferrer nofollow",
        },
      },
    ],
  },
};

export default Editor;
