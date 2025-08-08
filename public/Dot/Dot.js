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
    }
    get Radius() {
        return parseFloat(getComputedStyle(this.dotElement).getPropertyValue("--radius"));
    }
    set Radius(value) {
        this.dotElement.style.setProperty("--radius", value.toString());
    }
    get Color() {
        return parseFloat(getComputedStyle(this.dotElement).getPropertyValue("--hue"));
    }
    set Color(value) {
        this.dotElement.style.setProperty("--hue", value.toString());
    }
    get BackgroundColor() {
        return parseFloat(getComputedStyle(document.body).getPropertyValue("--bg-hue"));
    }
    set BackgroundColor(value) {
        document.body.style.setProperty("--bg-hue", value.toString());
        // Update background color immediately
        document.body.style.backgroundColor = `hsl(${value}, 70%, ${this.BackgroundIntensity}%)`;
    }
    get BackgroundIntensity() {
        return parseFloat(getComputedStyle(document.body).getPropertyValue("--bg-intensity"));
    }
    set BackgroundIntensity(value) {
        document.body.style.setProperty("--bg-intensity", value.toString());
        // Update background color immediately
        document.body.style.backgroundColor = `hsl(${this.BackgroundColor}, 70%, ${value}%)`;
    }
    DotUpdate(dTime) {
        this.dTime = dTime;
        RoutineManager.activeDotRoutines[RoutineManager.currentRoutineIndex].Execute(this);
    }
}
