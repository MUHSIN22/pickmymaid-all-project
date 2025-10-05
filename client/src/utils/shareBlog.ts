
export const shareBlogs = (
    media: string,
    blogId: string,
    title: string
  ): string | null => {
    let shareLink = '';
    if (media === 'whatsapp') {
      shareLink = `https://api.whatsapp.com/send?text=https://pickmymaid.com/blogs/${blogId}`;
    } else if (media === 'facebook') {
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=https://pickmymaid.com/blogs/${blogId}`;
    } else if (media === 'linkedin') {
      shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=https://pickmymaid.com/blogs/${blogId}&title=${title}&summary=&source=`;
    } else if (media === 'copy') {
      const copyText = `https://pickmymaid.com/blogs/${blogId}`;
      navigator.clipboard.writeText(copyText);
      return 'copied' as string;
    }
  
    // ? - Need to open in new tab
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    shareLink && window.open(shareLink, '_blank');
    return null;
  };
  