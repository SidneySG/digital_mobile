import * as ImageManipulator from "expo-image-manipulator";
import { Image } from "react-native";

/**
 * Adds a ruler overlay to a photo for anti-fraud verification
 * The ruler shows 0-50cm scale at the bottom of the image
 * This helps detect if someone is photographing a printed photo
 */
export async function addRulerToImage(photoUri) {
  try {
    // Get image dimensions
    const imageSize = await getImageSize(photoUri);
    const { width, height } = imageSize;

    // Calculate ruler dimensions
    const rulerHeight = 120;
    const rulerY = height - rulerHeight - 30;
    const rulerWidth = width - 60; // 30px margin on each side
    const rulerX = 30;

    // Create SVG ruler overlay
    const rulerSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Semi-transparent background for ruler area -->
        <rect x="${rulerX - 10}" y="${rulerY - 10}" 
              width="${rulerWidth + 20}" height="${rulerHeight + 20}" 
              fill="rgba(0, 0, 0, 0.85)" rx="12" ry="12"/>
        
        <!-- Title -->
        <text x="${width / 2}" y="${rulerY + 15}" 
              font-size="16" font-weight="bold" 
              fill="#D4AF37" text-anchor="middle" 
              font-family="sans-serif">
          RÉGUA DE VERIFICAÇÃO
        </text>
        
        <!-- Main ruler line -->
        <line x1="${rulerX}" y1="${rulerY + 60}" 
              x2="${rulerX + rulerWidth}" y2="${rulerY + 60}" 
              stroke="#D4AF37" stroke-width="3"/>
        
        ${generateRulerMarks(rulerX, rulerY, rulerWidth)}
        
        <!-- Bottom label -->
        <text x="${width / 2}" y="${rulerY + 105}" 
              font-size="12" fill="#FFFFFF" 
              text-anchor="middle" font-family="sans-serif">
          Escala: 0-50 centímetros (anti-fraude)
        </text>
      </svg>
    `;

    // Convert SVG to base64
    const svgBase64 = btoa(rulerSvg);
    const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;

    // Use ImageManipulator to overlay the ruler
    const result = await ImageManipulator.manipulateAsync(
      photoUri,
      [
        {
          overlay: {
            uri: svgDataUri,
            position: { x: 0, y: 0 },
          },
        },
      ],
      {
        compress: 0.9,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );

    return result.uri;
  } catch (error) {
    console.error("Error adding ruler to image:", error);
    // Return original photo if processing fails
    return photoUri;
  }
}

/**
 * Generate SVG markup for ruler tick marks and numbers
 */
function generateRulerMarks(startX, startY, totalWidth) {
  let marks = "";
  const cmWidth = totalWidth / 50; // 50 cm total

  for (let cm = 0; cm <= 50; cm++) {
    const x = startX + cm * cmWidth;
    const isTen = cm % 10 === 0;
    const isFive = cm % 5 === 0;

    // Determine mark height
    const markHeight = isTen ? 30 : isFive ? 20 : 12;
    const color = isTen ? "#D4AF37" : "#FFFFFF";
    const strokeWidth = isTen ? 2.5 : 1.5;

    // Draw tick mark
    marks += `
      <line x1="${x}" y1="${startY + 60}" 
            x2="${x}" y2="${startY + 60 - markHeight}" 
            stroke="${color}" stroke-width="${strokeWidth}"/>
    `;

    // Draw number for every 10cm
    if (isTen) {
      marks += `
        <text x="${x}" y="${startY + 90}" 
              font-size="14" font-weight="bold" 
              fill="#D4AF37" text-anchor="middle" 
              font-family="sans-serif">
          ${cm}
        </text>
      `;
    }
  }

  return marks;
}

function getImageSize(uri) {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => reject(error),
    );
  });
}



