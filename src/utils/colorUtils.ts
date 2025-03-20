const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r = 0, g = 0, b = 0;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const getLighterColor = (color: string): string => {
  const rgb = color.match(/\d+/g);
  if (!rgb) return '#ffffff';
  
  const [r, g, b] = rgb.map(Number);
  
  // 检查是否为黑色或接近黑色
  if (r <= 30 && g <= 30 && b <= 30) {
    return 'rgb(128, 128, 128)'; // 返回中灰色
  }
  
  // 检查是否为白色或接近白色
  if (r >= 240 && g >= 240 && b >= 240) {
    return 'rgb(255, 255, 255)'; // 保持白色
  }
  
  const [h, s, l] = rgbToHsl(r, g, b);
  const newL = Math.min(l + 30, 95); // 增加亮度，但不超过95%
  const [newR, newG, newB] = hslToRgb(h, s, newL);
  
  return `rgb(${newR}, ${newG}, ${newB})`;
};

export const getImageDominantColor = (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
      if (!imageData) {
        resolve('#ffffff');
        return;
      }

      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        count++;
      }

      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      resolve(`rgb(${r}, ${g}, ${b})`);
    };
    img.onerror = () => resolve('#ffffff');
    img.src = imageUrl;
  });
};

export const getBrightness = (color: string): number => {
  const rgb = color.match(/\d+/g);
  if (!rgb) return 255;
  const [r, g, b] = rgb.map(Number);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

export const getTextColor = (bgColor: string): string => {
  const brightness = getBrightness(bgColor);
  return brightness > 128 ? 'text-gray-800' : 'text-white';
};