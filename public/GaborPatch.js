class GaborPatch {
    constructor(canvas, size = 100) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.size = size;
        this.canvas.width = size;
        this.canvas.height = size;
        
        // Gabor parameters
        this.orientation = 0; // in radians
        this.frequency = 0.1; // spatial frequency
        this.phase = 0; // phase offset
        this.sigma = size / 6; // standard deviation of Gaussian envelope
        this.amplitude = 1.0; // contrast
        this.color = { r: 255, g: 0, b: 0 }; // default red
        
        this.generatePatch();
    }
    
    setSize(newSize) {
        this.size = newSize;
        this.canvas.width = newSize;
        this.canvas.height = newSize;
        this.sigma = newSize / 6;
        this.generatePatch();
    }
    
    setColor(hue) {
        // Convert HSL to RGB
        const h = hue / 360;
        const s = 0.7; // saturation
        const l = 0.6; // lightness
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        if (h < 1/6) {
            r = c; g = x; b = 0;
        } else if (h < 2/6) {
            r = x; g = c; b = 0;
        } else if (h < 3/6) {
            r = 0; g = c; b = x;
        } else if (h < 4/6) {
            r = 0; g = x; b = c;
        } else if (h < 5/6) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }
        
        this.color = {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
        
        this.generatePatch();
    }
    
    randomize() {
        this.orientation = Math.random() * Math.PI * 2;
        this.frequency = 0.05 + Math.random() * 0.15;
        this.phase = Math.random() * Math.PI * 2;
        this.sigma = this.size / (4 + Math.random() * 4);
        this.generatePatch();
    }
    
    generatePatch() {
        const centerX = this.size / 2;
        const centerY = this.size / 2;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.size, this.size);
        
        // Create image data for pixel manipulation
        const imageData = this.ctx.createImageData(this.size, this.size);
        const data = imageData.data;
        
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const dx = x - centerX;
                const dy = y - centerY;
                
                // Rotate coordinates
                const cosO = Math.cos(this.orientation);
                const sinO = Math.sin(this.orientation);
                const xRot = dx * cosO + dy * sinO;
                const yRot = -dx * sinO + dy * cosO;
                
                // Calculate Gabor function
                const gaussian = Math.exp(-(xRot * xRot + yRot * yRot) / (2 * this.sigma * this.sigma));
                const grating = Math.cos(2 * Math.PI * this.frequency * xRot + this.phase);
                const gabor = this.amplitude * gaussian * grating;
                
                // Convert to pixel values (0-255)
                const pixelValue = Math.round((gabor + 1) * 127.5);
                
                const index = (y * this.size + x) * 4;
                data[index] = Math.round((pixelValue / 255) * this.color.r);     // R
                data[index + 1] = Math.round((pixelValue / 255) * this.color.g); // G
                data[index + 2] = Math.round((pixelValue / 255) * this.color.b); // B
                data[index + 3] = 255; // A
            }
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }
    
    getCanvas() {
        return this.canvas;
    }
}

// Export for use in other modules
window.GaborPatch = GaborPatch;
