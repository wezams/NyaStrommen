document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const commentText = document.getElementById('user-input').value;
  
    // GitHub API details
    const token = '';
    const repo = 'wezams/NyaStrommen';
    const filePath = 'comments.json';
  
    // Fetch existing comments
    let comments = [];
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      headers: { Authorization: `token ${token}` }
    });
    if (response.ok) {
      const fileData = await response.json();
      const content = atob(fileData.content);
      comments = JSON.parse(content);
    }
  
    // Add new comment
    comments.push({ text: commentText, date: new Date().toISOString() });
  
    // Save back to GitHub
    const updatedContent = btoa(JSON.stringify(comments, null, 2));
    await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: { Authorization: `token ${token}` },
      body: JSON.stringify({
        message: 'Add new comment',
        content: updatedContent,
        sha: response.ok ? fileData.sha : undefined
      })
    });
  
    alert('Comment submitted!');
  });
  