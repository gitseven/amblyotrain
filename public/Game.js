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
    if (!savedVelocity) localStorage.setItem('velocity', '3');
    if (!savedSize) localStorage.setItem('size', '2');
    if (!savedBallColor) localStorage.setItem('ballColor', '0');
    if (!savedBgColor) localStorage.setItem('bgColor', '240');
    if (!savedBgIntensity) localStorage.setItem('bgIntensity', '50');
    
    // Apply saved settings by dispatching events
    if (savedVelocity) {
        window.dispatchEvent(new CustomEvent('Game:VelocityValueChanged', {
            detail: { velocity: parseFloat(savedVelocity) }
        }));
    }
    
    if (savedSize) {
        window.dispatchEvent(new CustomEvent('Game:RadiusValueChanged', {
            detail: { radius: parseFloat(savedSize) }
        }));
    }
    
    if (savedBallColor) {
        window.dispatchEvent(new CustomEvent('Game:ColorValueChanged', {
            detail: { hue: parseInt(savedBallColor) }
        }));
    }
    
    if (savedBgColor) {
        window.dispatchEvent(new CustomEvent('Game:BackgroundColorValueChanged', {
            detail: { hue: parseInt(savedBgColor) }
        }));
    }
    
    if (savedBgIntensity) {
        window.dispatchEvent(new CustomEvent('Game:BackgroundIntensityValueChanged', {
            detail: { intensity: parseInt(savedBgIntensity) }
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
    SetGaborToggleEvent();
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
    let currentVelocity = parseFloat(localStorage.getItem('velocity')) || 3;
    const velocityMinus = document.getElementById("velocityminus");
    const velocityPlus = document.getElementById("velocityplus");
    
    const updateVelocity = (newVelocity) => {
        currentVelocity = Math.max(0, Math.min(25, newVelocity));
        localStorage.setItem('velocity', currentVelocity.toString());
        window.dispatchEvent(new CustomEvent('Game:VelocityValueChanged', {
            detail: { velocity: currentVelocity }
        }));
    };
    
    // Minus button
    velocityMinus.addEventListener("click", () => {
        updateVelocity(currentVelocity - 0.5);
    });
    
    velocityMinus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateVelocity(currentVelocity - 0.5);
    });
    
    // Plus button
    velocityPlus.addEventListener("click", () => {
        updateVelocity(currentVelocity + 0.5);
    });
    
    velocityPlus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateVelocity(currentVelocity + 0.5);
    });
};
const SetRadiusChangeEvent = () => {
    let currentSize = parseFloat(localStorage.getItem('size')) || 2;
    const sizeMinus = document.getElementById("sizeminus");
    const sizePlus = document.getElementById("sizeplus");
    
    const updateSize = (newSize) => {
        currentSize = Math.max(0.01, Math.min(10, newSize));
        localStorage.setItem('size', currentSize.toString());
        window.dispatchEvent(new CustomEvent('Game:RadiusValueChanged', {
            detail: { radius: currentSize }
        }));
    };
    
    // Minus button
    sizeMinus.addEventListener("click", () => {
        updateSize(currentSize - 0.5);
    });
    
    sizeMinus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSize(currentSize - 0.5);
    });
    
    // Plus button
    sizePlus.addEventListener("click", () => {
        updateSize(currentSize + 0.5);
    });
    
    sizePlus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateSize(currentSize + 0.5);
    });
};
const SetColorChangeEvent = () => {
    let currentColor = parseInt(localStorage.getItem('ballColor')) || 0;
    const colorMinus = document.getElementById("colorminus");
    const colorPlus = document.getElementById("colorplus");
    
    const updateColor = (newColor) => {
        currentColor = Math.max(0, Math.min(360, newColor));
        localStorage.setItem('ballColor', currentColor.toString());
        window.dispatchEvent(new CustomEvent('Game:ColorValueChanged', {
            detail: { hue: currentColor }
        }));
    };
    
    // Minus button
    colorMinus.addEventListener("click", () => {
        updateColor(currentColor - 30);
    });
    
    colorMinus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateColor(currentColor - 30);
    });
    
    // Plus button
    colorPlus.addEventListener("click", () => {
        updateColor(currentColor + 30);
    });
    
    colorPlus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateColor(currentColor + 30);
    });
};

const SetBackgroundColorChangeEvent = () => {
    let currentBgColor = parseInt(localStorage.getItem('bgColor')) || 240;
    const bgColorMinus = document.getElementById("bgcolorminus");
    const bgColorPlus = document.getElementById("bgcolorplus");
    
    // Predefined colors including black and white
    const colors = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]; // 360 = white, 0 = black
    let currentColorIndex = colors.indexOf(currentBgColor);
    if (currentColorIndex === -1) currentColorIndex = 8; // Default to blue (240)
    
    const updateBgColor = (newColor) => {
        currentBgColor = newColor;
        localStorage.setItem('bgColor', currentBgColor.toString());
        window.dispatchEvent(new CustomEvent('Game:BackgroundColorValueChanged', {
            detail: { hue: currentBgColor }
        }));
    };
    
    // Minus button - cycle through colors
    bgColorMinus.addEventListener("click", () => {
        currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
        updateBgColor(colors[currentColorIndex]);
    });
    
    bgColorMinus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
        updateBgColor(colors[currentColorIndex]);
    });
    
    // Plus button - cycle through colors
    bgColorPlus.addEventListener("click", () => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        updateBgColor(colors[currentColorIndex]);
    });
    
    bgColorPlus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        updateBgColor(colors[currentColorIndex]);
    });
};

const SetBackgroundIntensityChangeEvent = () => {
    let currentIntensity = parseInt(localStorage.getItem('bgIntensity')) || 50;
    const bgIntensityMinus = document.getElementById("bgintensityminus");
    const bgIntensityPlus = document.getElementById("bgintensityplus");
    
    const updateIntensity = (newIntensity) => {
        currentIntensity = Math.max(5, Math.min(50, newIntensity));
        localStorage.setItem('bgIntensity', currentIntensity.toString());
        window.dispatchEvent(new CustomEvent('Game:BackgroundIntensityValueChanged', {
            detail: { intensity: currentIntensity }
        }));
    };
    
    // Minus button
    bgIntensityMinus.addEventListener("click", () => {
        updateIntensity(currentIntensity - 5);
    });
    
    bgIntensityMinus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateIntensity(currentIntensity - 5);
    });
    
    // Plus button
    bgIntensityPlus.addEventListener("click", () => {
        updateIntensity(currentIntensity + 5);
    });
    
    bgIntensityPlus.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        updateIntensity(currentIntensity + 5);
    });
};

const SetGaborToggleEvent = () => {
    const gaborToggle = document.getElementById("gabortoggle");
    
    gaborToggle.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent('Game:GaborToggle'));
    });
    
    gaborToggle.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.dispatchEvent(new CustomEvent('Game:GaborToggle'));
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
