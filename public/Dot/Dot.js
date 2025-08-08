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
    DotUpdate(dTime) {
        this.dTime = dTime;
        RoutineManager.activeDotRoutines[RoutineManager.currentRoutineIndex].Execute(this);
    }
}
