import { Dot } from "./Dot/Dot.js";
import { SubscribeToRoutineChangedEvent } from "./RoutineTitleFollower.js";
import { SubscribeToNotificationsButtonClick } from "./PushNotifications.js";
const InitializeScene = () => {
    new Dot(document.getElementById("dot"));
    // TODO
    // Creat UIEventDispatcher class (component base type) and move them there, and change the name of this class to GameScene.
    SetLeftArrowEvent();
    SetRightArrowEvent();
    SetVelocityChangeEvent();
    SetRadiusChangeEvent();
    SetColorChangeEvent();
    SetBackgroundColorChangeEvent();
    SetBackgroundIntensityChangeEvent();
    // SetReminderButtonEvent();
    // TODO
    // Create a component base class which has awake and update methods, and instantiate those classes instead.
    SubscribeToRoutineChangedEvent();
    SubscribeToNotificationsButtonClick();
};
const SetLeftArrowEvent = () => {
    const leftArrowClickEvent = new CustomEvent('Game:LeftArrowClick');
    const leftArrow = document.querySelector(".arrow.left");
    
    // Mouse events
    leftArrow.addEventListener("click", () => {
        window.dispatchEvent(leftArrowClickEvent);
    });
    
    // Touch events
    leftArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        window.dispatchEvent(leftArrowClickEvent);
    });
};
const SetRightArrowEvent = () => {
    const rightArrowClickEvent = new CustomEvent('Game:RightArrowClick');
    const rightArrow = document.querySelector(".arrow.right");
    
    // Mouse events
    rightArrow.addEventListener("click", () => {
        window.dispatchEvent(rightArrowClickEvent);
    });
    
    // Touch events
    rightArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        window.dispatchEvent(rightArrowClickEvent);
    });
};
const SetVelocityChangeEvent = () => {
    const velocitySlider = document.getElementById("velocityslider");
    const velocityValueChanged = new CustomEvent('Game:VelocityValueChanged', {
        detail: {
            velocity: velocitySlider.value
        }
    });
    
    // Mouse and touch events
    velocitySlider.addEventListener("input", () => {
        velocityValueChanged.detail.velocity = velocitySlider.value;
        window.dispatchEvent(velocityValueChanged);
    });
    
    velocitySlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
};
const SetRadiusChangeEvent = () => {
    const radiusSlider = document.getElementById("sizeslider");
    const radiusValueChanged = new CustomEvent('Game:RadiusValueChanged', {
        detail: {
            radius: radiusSlider.value
        }
    });
    
    // Mouse and touch events
    radiusSlider.addEventListener("input", () => {
        radiusValueChanged.detail.radius = radiusSlider.value;
        window.dispatchEvent(radiusValueChanged);
    });
    
    radiusSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
};
const SetColorChangeEvent = () => {
    const colorSlider = document.getElementById("colorslider");
    const colorValueChanged = new CustomEvent('Game:ColorValueChanged', {
        detail: {
            hue: colorSlider.value
        }
    });
    
    // Mouse and touch events
    colorSlider.addEventListener("input", () => {
        colorValueChanged.detail.hue = colorSlider.value;
        window.dispatchEvent(colorValueChanged);
    });
    
    colorSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
};

const SetBackgroundColorChangeEvent = () => {
    const bgColorSlider = document.getElementById("bgcolorslider");
    const bgColorValueChanged = new CustomEvent('Game:BackgroundColorValueChanged', {
        detail: {
            hue: bgColorSlider.value
        }
    });
    
    // Mouse and touch events
    bgColorSlider.addEventListener("input", () => {
        bgColorValueChanged.detail.hue = bgColorSlider.value;
        window.dispatchEvent(bgColorValueChanged);
    });
    
    bgColorSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
};

const SetBackgroundIntensityChangeEvent = () => {
    const bgIntensitySlider = document.getElementById("bgintensityslider");
    const bgIntensityValueChanged = new CustomEvent('Game:BackgroundIntensityValueChanged', {
        detail: {
            intensity: bgIntensitySlider.value
        }
    });
    
    // Mouse and touch events
    bgIntensitySlider.addEventListener("input", () => {
        bgIntensityValueChanged.detail.intensity = bgIntensitySlider.value;
        window.dispatchEvent(bgIntensityValueChanged);
    });
    
    bgIntensitySlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });
};

const SetReminderButtonEvent = () => {
    const notificationsClickEvent = new CustomEvent('Game:NotificationsButtonClick');
    const button = document.getElementById("notifications-button");
    button.addEventListener("click", () => {
        window.dispatchEvent(notificationsClickEvent);
    });
};
InitializeScene();
