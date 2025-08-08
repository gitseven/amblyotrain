import { Dot } from "./Dot/Dot.js";
import { SubscribeToRoutineChangedEvent } from "./RoutineTitleFollower.js";
import { SubscribeToNotificationsButtonClick } from "./PushNotifications.js";
const LoadSavedSettings = () => {
    // Load saved settings from localStorage and apply them
    const savedVelocity = localStorage.getItem('velocity');
    const savedSize = localStorage.getItem('size');
    const savedBallColor = localStorage.getItem('ballColor');
    const savedBgColor = localStorage.getItem('bgColor');
    const savedBgIntensity = localStorage.getItem('bgIntensity');
    
    // If no saved settings exist, save the current defaults
    if (!savedVelocity) localStorage.setItem('velocity', document.getElementById("velocityslider").value);
    if (!savedSize) localStorage.setItem('size', document.getElementById("sizeslider").value);
    if (!savedBallColor) localStorage.setItem('ballColor', document.getElementById("colorslider").value);
    if (!savedBgColor) localStorage.setItem('bgColor', document.getElementById("bgcolorslider").value);
    if (!savedBgIntensity) localStorage.setItem('bgIntensity', document.getElementById("bgintensityslider").value);
    
    // Apply saved settings to sliders
    if (savedVelocity) {
        document.getElementById("velocityslider").value = savedVelocity;
        // Trigger the event to apply the setting
        window.dispatchEvent(new CustomEvent('Game:VelocityValueChanged', {
            detail: { velocity: savedVelocity }
        }));
    }
    
    if (savedSize) {
        document.getElementById("sizeslider").value = savedSize;
        // Trigger the event to apply the setting
        window.dispatchEvent(new CustomEvent('Game:RadiusValueChanged', {
            detail: { radius: savedSize }
        }));
    }
    
    if (savedBallColor) {
        document.getElementById("colorslider").value = savedBallColor;
        // Trigger the event to apply the setting
        window.dispatchEvent(new CustomEvent('Game:ColorValueChanged', {
            detail: { hue: savedBallColor }
        }));
    }
    
    if (savedBgColor) {
        document.getElementById("bgcolorslider").value = savedBgColor;
        // Trigger the event to apply the setting
        window.dispatchEvent(new CustomEvent('Game:BackgroundColorValueChanged', {
            detail: { hue: savedBgColor }
        }));
    }
    
    if (savedBgIntensity) {
        document.getElementById("bgintensityslider").value = savedBgIntensity;
        // Trigger the event to apply the setting
        window.dispatchEvent(new CustomEvent('Game:BackgroundIntensityValueChanged', {
            detail: { intensity: savedBgIntensity }
        }));
    }
};

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
    
    // Load saved settings after everything is initialized
    LoadSavedSettings();
};
const SetLeftArrowEvent = () => {
    const leftArrowClickEvent = new CustomEvent('Game:LeftArrowClick');
    const leftArrow = document.querySelector(".arrow.left");
    
    // Mouse events
    leftArrow.addEventListener("click", () => {
        window.dispatchEvent(leftArrowClickEvent);
    });
    
    // Touch events - improved for better responsiveness
    leftArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(leftArrowClickEvent);
    });
    
    leftArrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
};
const SetRightArrowEvent = () => {
    const rightArrowClickEvent = new CustomEvent('Game:RightArrowClick');
    const rightArrow = document.querySelector(".arrow.right");
    
    // Mouse events
    rightArrow.addEventListener("click", () => {
        window.dispatchEvent(rightArrowClickEvent);
    });
    
    // Touch events - improved for better responsiveness
    rightArrow.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(rightArrowClickEvent);
    });
    
    rightArrow.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        // Save to localStorage
        localStorage.setItem('velocity', velocitySlider.value);
    });
    
    velocitySlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    velocitySlider.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    velocitySlider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        // Save to localStorage
        localStorage.setItem('size', radiusSlider.value);
    });
    
    radiusSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    radiusSlider.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    radiusSlider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        // Save to localStorage
        localStorage.setItem('ballColor', colorSlider.value);
    });
    
    colorSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    colorSlider.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    colorSlider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        // Save to localStorage
        localStorage.setItem('bgColor', bgColorSlider.value);
    });
    
    bgColorSlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    bgColorSlider.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    bgColorSlider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
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
        // Save to localStorage
        localStorage.setItem('bgIntensity', bgIntensitySlider.value);
    });
    
    bgIntensitySlider.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    bgIntensitySlider.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    
    bgIntensitySlider.addEventListener("touchmove", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
};

const SetReminderButtonEvent = () => {
    const notificationsClickEvent = new CustomEvent('Game:NotificationsButtonClick');
    const button = document.getElementById("notifications-button");
    button.addEventListener("click", () => {
        window.dispatchEvent(notificationsClickEvent);
    });
};

// Utility function to clear all saved settings (for debugging or reset)
const ClearAllSettings = () => {
    localStorage.removeItem('velocity');
    localStorage.removeItem('size');
    localStorage.removeItem('ballColor');
    localStorage.removeItem('bgColor');
    localStorage.removeItem('bgIntensity');
    console.log('All settings cleared. Refresh the page to see defaults.');
};

// Make it available globally for debugging
window.clearBlinkCampSettings = ClearAllSettings;
InitializeScene();
