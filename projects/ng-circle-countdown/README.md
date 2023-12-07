# Angular circle countdown (NgCircleCountdown)

[![Build Status](https://travis-ci.org/jlevot/ng-circle-countdown.svg?branch=master)](https://travis-ci.org/jlevot/ng-circle-countdown) [![npm version](https://badge.fury.io/js/ng-circle-countdown.svg)](https://badge.fury.io/js/ng-circle-countdown) [![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/ng-circle-countdown)

An Angular package for displaying a circle countdown fully configurable.

![alt](src/assets/circle_countdown.gif)

**Compatibility:**

| Angular |
|---------|
| 16.x.x  |

## Installation

### Install This Library

`$ npm install ng-circle-countdown --save`

## Usage

### Import

Add `CircleCountdownModule` to your module file:

```javascript
imports: [CircleCountdownModule];
```

You can use it by this way:

```html

<div class="counter-container">
    <ng-circle-countdown
        #timer_color
        [duration]="10000"
        [colors]="[ '#004777', '#F7B801', '#A30000', '#A30000' ]"
        [colorsTime]="[ 7, 5, 2, 0 ]">
        <ng-template #counter let-counter>
            <span class="remaining-time" [style.color]="counter.color">{{counter.value}}</span>
        </ng-template>
    </ng-circle-countdown>
</div>
```

You can choose to use a formControl or just a formControlName. It depends on your needs.

## Options

| Options     | Type            | Default     | Description                                                                       |
|-------------|-----------------|-------------|-----------------------------------------------------------------------------------|
| duration    | `number`        | `0`         | Countdown duration (in ms)                                                        |
| color       | `string`        | `#004777`   | Primary color for the countdown displaying                                        |
| colors      | `<string>[]`    | `[]`        | Colors (HEX format) for the countdown displaying if you want to insert a gradient |
| colorsTime  | `number[]`      | `[]`        | Time interval(in s) to determine when the countdown should change color           |
| strokeWidth | `number`        | `6`         | Line thickness countdown                                                          |
| size        | `number`        | `None`      | Define the component size to match with your UI                                   |
| rotation    | `RotationType ` | `clockwise` | Direction of the countdown rotation                                               |
| onComplete  | `Event`         | `None`      | Emit an event to prevent the user countdown is over                               |

You can choose to set only one color to the countdown, so you just have to set the color property.

If you want to generate a gradient color, then set the colors array with the colors you want to display.
<br/>
You also have to set colorsTime array property to configure the color change moment.
