interface SlideInDirectionOptions {
    currentTabIndex: number
    previousTabIndex: number | null
}

/**
 * Determines from which direction the content should be slid in.
 */
export function determineSlideInDirection(options: SlideInDirectionOptions): "right" | "left" | "below" {
    if (options.previousTabIndex === null) {
        return "below";
    }

    // If last tab comes after new tab, slide in from right. Else, default to slide in from left.
    return options.previousTabIndex < options.currentTabIndex ? "right" : "left";
}
