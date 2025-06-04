document.addEventListener("DOMContentLoaded", function () {
  // Like button functionality
  const likeButton = document.querySelector(".like-button");
  if (likeButton) {
    let isLiked = localStorage.getItem(`liked_${window.location.pathname}`) === "true";
    updateLikeButton(likeButton, isLiked);

    likeButton.addEventListener("click", function () {
      isLiked = !isLiked;
      localStorage.setItem(`liked_${window.location.pathname}`, isLiked);
      updateLikeButton(likeButton, isLiked);

      // Animation effect
      likeButton.classList.add("scale-125");
      setTimeout(() => {
        likeButton.classList.remove("scale-125");
      }, 200);
    });
  }

  // Share button functionality
  const shareButton = document.querySelector(".share-button");
  if (shareButton) {
    shareButton.addEventListener("click", async function () {
      const title = document.title;
      const url = window.location.href;

      // Check if Web Share API is supported
      if (navigator.share) {
        try {
          await navigator.share({
            title: title,
            url: url,
          });
        } catch (err) {
          console.log("Error sharing:", err);
          fallbackShare(url);
        }
      } else {
        fallbackShare(url);
      }

      // Animation effect
      shareButton.classList.add("scale-125");
      setTimeout(() => {
        shareButton.classList.remove("scale-125");
      }, 200);
    });
  }
});

function updateLikeButton(button, isLiked) {
  // Update SVG fill and color
  const svg = button.querySelector("svg");
  if (isLiked) {
    svg.classList.remove("text-gray-400");
    svg.classList.add("text-amber-400");
    svg.setAttribute("fill", "currentColor");
  } else {
    svg.classList.remove("text-amber-400");
    svg.classList.add("text-gray-400");
    svg.setAttribute("fill", "none");
  }
}

function fallbackShare(url) {
  // Create a temporary input element
  const input = document.createElement("input");
  input.value = url;
  document.body.appendChild(input);

  // Copy the URL
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);

  // Show toast notification
  showToast("URL copied to clipboard!");
}

function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  // Create and show new toast
  const toast = document.createElement("div");
  toast.className =
    "toast fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300";
  toast.textContent = message;
  document.body.appendChild(toast);

  // Fade out and remove after 3 seconds
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
