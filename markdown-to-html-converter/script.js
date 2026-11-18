const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let markdown = markdownInput.value;

  // Convert headings
  markdown = markdown.replace(
    /^\s*### (.+)$/gm,
    "<h3>$1</h3>"
  );

  markdown = markdown.replace(
    /^\s*## (.+)$/gm,
    "<h2>$1</h2>"
  );

  markdown = markdown.replace(
    /^\s*# (.+)$/gm,
    "<h1>$1</h1>"
  );

  // Convert blockquotes
  markdown = markdown.replace(
    /^\s*> (.+)$/gm,
    "<blockquote>$1</blockquote>"
  );

  // Convert images
  markdown = markdown.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img alt="$1" src="$2">'
  );

  // Convert links
  markdown = markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>'
  );

  // Convert bold text using **
  markdown = markdown.replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
  );

  // Convert bold text using __
  markdown = markdown.replace(
    /__(.+?)__/g,
    "<strong>$1</strong>"
  );

  // Convert italic text using *
  markdown = markdown.replace(
    /\*([^*\n]+)\*/g,
    "<em>$1</em>"
  );

  // Convert italic text using _
  markdown = markdown.replace(
    /_([^_\n]+)_/g,
    "<em>$1</em>"
  );

  // Remove line breaks
  markdown = markdown.replace(/\r?\n/g, "");

  return markdown;
}

function updatePreview() {
  const html = convertMarkdown();

  htmlOutput.textContent = html;
  preview.innerHTML = html;
}

markdownInput.addEventListener("input", updatePreview);

updatePreview();
