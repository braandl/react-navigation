"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShiftTransition = exports.FadeTransition = void 0;
var _SceneStyleInterpolators = require("./SceneStyleInterpolators");
var _TransitionSpecs = require("./TransitionSpecs");
const FadeTransition = exports.FadeTransition = {
  transitionSpec: _TransitionSpecs.FadeSpec,
  sceneStyleInterpolator: _SceneStyleInterpolators.forFade
};
const ShiftTransition = exports.ShiftTransition = {
  transitionSpec: _TransitionSpecs.ShiftSpec,
  sceneStyleInterpolator: _SceneStyleInterpolators.forShift
};
//# sourceMappingURL=TransitionPresets.js.map