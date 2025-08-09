import { GameElement } from "../Engine/GameElement.js";
import "../Utils/NumberUtils.js";
import RoutineManager from "./DotRoutineManager.js";
export class Dot extends GameElement {
    constructor(dotElement) {
        // Pass the parent class a reference which will then be this new object.
        super(dotElement, null);
        this.velocity = 3;
        this.dTime = 0;
        this.halfScreen = 50;
        this.dotElement = dotElement;
        
        // Initialize Gabor patch
        this.initializeGaborPatch();
        
        // Set the gameElementInstance after super call
        this.gameElementInstance = this;
        // Override the parent's Update method to call our own Update
        const originalUpdate = this.Update;
        this.Update = (dTime) => {
            this.DotUpdate(dTime);
        };
        window.addEventListener('Game:VelocityValueChanged', (event) => {
            this.velocity = event.detail.velocity;
        });
        window.addEventListener('Game:RadiusValueChanged', (event) => {
            this.Radius = event.detail.radius;
        });
        window.addEventListener('Game:ColorValueChanged', (event) => {
            this.Color = event.detail.hue;
        });
        window.addEventListener('Game:BackgroundColorValueChanged', (event) => {
            this.BackgroundColor = event.detail.hue;
        });
        window.addEventListener('Game:BackgroundIntensityValueChanged', (event) => {
            this.BackgroundIntensity = event.detail.intensity;
        });
        window.addEventListener('Game:GaborToggle', (event) => {
            this.randomizeGaborPatch();
        });
    }
    
    initializeGaborPatch() {
        // Create canvas for Gabor patch
        this.gaborCanvas = document.createElement('canvas');
        this.gaborCanvas.style.width = '100%';
        this.gaborCanvas.style.height = '100%';
        this.gaborCanvas.style.display = 'block';
        
        // Clear the dot element and add the canvas
        this.dotElement.innerHTML = '';
        this.dotElement.appendChild(this.gaborCanvas);
        
        // Create Gabor patch
        this.gaborPatch = new GaborPatch(this.gaborCanvas, 100);
        this.gaborPatch.setColor(0); // Start with red
    }
    
    randomizeGaborPatch() {
        if (this.gaborPatch) {
            this.gaborPatch.randomize();
        }
    }
    get Radius() {
        return parseFloat(getComputedStyle(this.dotElement).getPropertyValue("--radius"));
    }
    set Radius(value) {
        this.dotElement.style.setProperty("--radius", value.toString());
        // Update Gabor patch size
        if (this.gaborPatch) {
            const size = Math.max(20, Math.round(value * 10)); // Convert radius to pixel size
            this.gaborPatch.setSize(size);
        }
    }
    get Color() {
        return parseFloat(getComputedStyle(this.dotElement).getPropertyValue("--hue"));
    }
    set Color(value) {
        this.dotElement.style.setProperty("--hue", value.toString());
        // Update Gabor patch color
        if (this.gaborPatch) {
            this.gaborPatch.setColor(value);
        }
    }
    get BackgroundColor() {
        return parseFloat(getComputedStyle(document.body).getPropertyValue("--bg-hue"));
    }
    set BackgroundColor(value) {
        document.body.style.setProperty("--bg-hue", value.toString());
        // Update background color immediately
        if (value === 0) {
            // Black
            document.body.style.backgroundColor = `hsl(0, 0%, 0%)`;
        } else if (value === 360) {
            // White
            document.body.style.backgroundColor = `hsl(0, 0%, 100%)`;
        } else {
            // Regular colors
            document.body.style.backgroundColor = `hsl(${value}, 70%, ${this.BackgroundIntensity}%)`;
        }
    }
    get BackgroundIntensity() {
        return parseFloat(getComputedStyle(document.body).getPropertyValue("--bg-intensity"));
    }
    set BackgroundIntensity(value) {
        document.body.style.setProperty("--bg-intensity", value.toString());
        // Update background color immediately
        if (this.BackgroundColor === 0) {
            // Black
            document.body.style.backgroundColor = `hsl(0, 0%, 0%)`;
        } else if (this.BackgroundColor === 360) {
            // White
            document.body.style.backgroundColor = `hsl(0, 0%, 100%)`;
        } else {
            // Regular colors
            document.body.style.backgroundColor = `hsl(${this.BackgroundColor}, 70%, ${value}%)`;
        }
    }
    DotUpdate(dTime) {
        this.dTime = dTime;
        RoutineManager.activeDotRoutines[RoutineManager.currentRoutineIndex].Execute(this);
    }
}
