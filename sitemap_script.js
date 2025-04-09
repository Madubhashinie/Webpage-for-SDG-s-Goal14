//Wait for HTML document to be loaded completely before execute the functions
document.addEventListener("DOMContentLoaded", function() {
    //Get the element with the ID "sitemap" from HTML document
    const svg = document.getElementById("sitemap");

  

    // Create base node (Home) with the link
    const baseNode = createNode(350, 50, "Homepage", "home.html");
    //Add the baseNode to SVG
    svg.appendChild(baseNode);
   //Add the text label for the base node 
    svg.appendChild(createText(350,50, "Homepage"));

    // Create array of child nodes under Home
    const childNodes = [
        { x: 50, y: 200, label: "Gallery", link: "gallery.html" },
        { x: 200, y: 200, label: "Shop", link: "shop.html", hasChildren: true },
        { x: 350, y: 200, label: "User Profile", link: "profile.html" },
        { x: 500, y: 200, label: "Feedback Form", link: "feedback.html" },
        { x: 650, y: 200, label: "Team Page", link: "team.html" }
    ];

    // Create array of child nodes under Shop
    const shopChildNodes = [
        { x: 200, y: 300, label: "Checkout Page", link: "checkout.html" }
    ];

    //Draw a horizontal line from Home node.
    drawLine(410,100,410,150);

    //Draw a vertical line which connects the child nodes
    drawLine(110,150,710,150);

    //Connect the vertical line and lines comes from child nodes
    childNodes.forEach(node =>{
        drawLine(node.x+60 , 150, node.x+60, node.y);
    });

    // Draw line between Shop node and its child node
    drawLine(260, 250, 260, 300);

    // Add all nodes and their texts to SVG
    childNodes.forEach(node => {
        svg.appendChild(createNode(node.x, node.y, node.label, node.link));
        svg.appendChild(createText(node.x, node.y, node.label));
    });
    shopChildNodes.forEach(node => {
        svg.appendChild(createNode(node.x, node.y, node.label, node.link));
        svg.appendChild(createText(node.x, node.y, node.label));
    });

    // Add event listeners to handle click and keyboard navigation of nodes
    const nodeList = document.querySelectorAll(".node");
    nodeList.forEach(node => {
        node.addEventListener("click", function() {
            const link = this.getAttribute("data-link");
            //Redirect the user to corresponding page when a node is clicked
            window.location.href = link;
        });

        node.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                const link = this.getAttribute("data-link");
                //Redirect the user to corresponding page when Enter or Space key is pressed
                window.location.href = link;
            }
        });
      
        // Add animation effect on hover
        node.addEventListener("mouseover", function () {
            this.style.transition = "all 0.3s ease"
            this.style.transform = "scale(1.05)"
            });

        node.addEventListener("mouseout", function () {
        this.style.transform = "scale(1)"
        });

    });

    // Update SVG dimensions on window resize to maintain responsiveness
    function updateSVGDimensions() {
        //Get the width of container of sitemap
        const containerWidth = document.querySelector(".svg-container").clientWidth
        //Set the width and height of the svg element
        svg.setAttribute("width", containerWidth);
        svg.setAttribute("height", containerWidth * 0.75); // Aspect ratio 4:3
    }

    updateSVGDimensions();
    //Listen for window resize events and update svg dimensions accordingly
    window.addEventListener("resize", updateSVGDimensions);

  // Make sure video is playing
  const video = document.getElementById("jellyfish")
  if (video) {
    video.play().catch((error) => {
      console.log("Auto-play was prevented:", error)
      // Create a play button as fallback
      const playButton = document.createElement("button")
      playButton.textContent = "Play Background"
      playButton.className = "play-button"
      document.querySelector(".video-background").appendChild(playButton)

      playButton.addEventListener("click", () => {
        video.play()
        playButton.style.display = "none"
      })
    })
  }

    // Add parallax effect to the video background
    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        if (document.getElementById("jellyfish")) {
        document.getElementById("jellyfish").style.transform =
            `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.1}px))`
        }
    });
});

// Function to create a rectangular node
function createNode(x, y, label, link) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    //Set class, position, dimensions,linnk, label and accessibility attributes
    rect.setAttribute("class", "node");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 120);
    rect.setAttribute("height", 50);
    rect.setAttribute("rx", 10);
    rect.setAttribute("ry", 10);
    rect.setAttribute("data-link", link);
    rect.setAttribute("aria-label", label);
    rect.setAttribute("alt",label);
    rect.setAttribute("tabindex", "0") // Make focusable for keyboard navigation
    return rect;
}

// Function to create text label for a node
function createText(x, y, label) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    //Set position, alignment, content, color, font size and font family
    text.setAttribute("x", x+60 );
    text.setAttribute("y", y+30 );
    text.setAttribute("text-anchor","middle");
    text.textContent = label;
    text.setAttribute("fill","white");
    text.setAttribute("font-size","14px");
    text.setAttribute("font-family","Arial, sans-serif");
    text.setAttribute("pointer-events", "none") // Prevent text from interfering with node clicks
    return text;
}

// Function to draw a line between two points
function drawLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    //Set coordinates and style attributes for lines
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#3d84a5")
    line.setAttribute("stroke-width", 2);
    line.setAttribute("stroke-dasharray", "0")
    line.setAttribute("stroke-linecap", "round")
  
    // Add animation effect
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    line.style.strokeDasharray = length
    line.style.strokeDashoffset = length
    line.style.animation = "drawLine 1.5s ease forwards"

    //Add lines to svg element
    document.getElementById("sitemap").appendChild(line);
    
    // Add the animation keyframes to the stylesheet
    if (!document.querySelector("style#line-animation")) {
        const style = document.createElement("style")
        style.id = "line-animation"
        style.textContent = `
        @keyframes drawLine {
            to {
            stroke-dashoffset: 0;
            }
        }
        `
        document.head.appendChild(style)
    }
}

const video = document.getElementById("jellyfish");
if (video) {
    console.log("Video element found!");
    video.play().catch((error) => {
        console.log("Auto-play was prevented:", error);
        // Rest of your code...
    });
} else {
    console.log("Video element not found!");
}