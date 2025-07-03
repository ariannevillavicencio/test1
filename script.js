// Smooth scrolling for navigation links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// JavaScript for the discount wheel
document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.getElementById("discountWheel");
  const spinBtn = document.getElementById("spinButton");
  const resultMessage = document.getElementById("resultMessage");

  // The discounts and their degree ranges for the wheel
  // This is a basic setup. For a real application, you'd want more precise calculations
  // to ensure the marker lands exactly in the middle of a segment.
  // For 8 segments, each is 45 degrees (360 / 8).
  // The min/max degrees are approximate for demonstration purposes, ....
  const degrees = [
    { value: "10% OFF", min: 0, max: 44.9 }, // Segment 1
    { value: "25% OFF", min: 45, max: 89.9 }, // Segment 2
    { value: "5% OFF", min: 90, max: 134.9 }, // Segment 3
    { value: "30% OFF", min: 135, max: 179.9 }, // Segment 4
    { value: "15% OFF", min: 180, max: 224.9 }, // Segment 5
    { value: "Try Again!", min: 225, max: 269.9 }, // Segment 6
    { value: "20% OFF", min: 270, max: 314.9 }, // Segment 7
    { value: "40% OFF", min: 315, max: 359.9 }, // Segment 8
  ];

  let currentRotation = 0; // To keep track of the current total rotation

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true; // Disable the button while spinning
    resultMessage.textContent = ""; // Clear previous message

    // Generate a random degree between 3600 (10 spins) and 7200 (20 spins)
    // This ensures the wheel spins multiple times.
    const randomDegree = Math.floor(Math.random() * (7200 - 3600 + 1)) + 3600;

    currentRotation += randomDegree; // Accumulate the rotation

    // Apply the rotation to the wheel
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // After the animation finishes (5 seconds, matching CSS transition duration)
    setTimeout(() => {
      // Normalize the final degree to be between 0 and 359
      const finalDegree = currentRotation % 360;

      let result = "Error determining result!";
      for (const segment of degrees) {
        if (finalDegree >= segment.min && finalDegree <= segment.max) {
          result = `Congratulations! You won: ${segment.value}`;
          break;
        }
      }
      resultMessage.textContent = result;
      spinBtn.disabled = false; // Enable the button again
    }, 5000); // Must match the CSS transition duration for the wheel (5s)
  });
});
