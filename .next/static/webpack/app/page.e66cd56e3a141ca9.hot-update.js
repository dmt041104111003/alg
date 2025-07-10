/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./components/AlgorithmVisualizer.tsx":
/*!********************************************!*\
  !*** ./components/AlgorithmVisualizer.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ AlgorithmVisualizer; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ \"(app-pages-browser)/./components/Header.tsx\");\n/* harmony import */ var _TabNavigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TabNavigation */ \"(app-pages-browser)/./components/TabNavigation.tsx\");\n/* harmony import */ var _algorithms_SortingAlgorithms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./algorithms/SortingAlgorithms */ \"(app-pages-browser)/./components/algorithms/SortingAlgorithms.tsx\");\n/* harmony import */ var _algorithms_SearchingAlgorithms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./algorithms/SearchingAlgorithms */ \"(app-pages-browser)/./components/algorithms/SearchingAlgorithms.tsx\");\n/* harmony import */ var _algorithms_SearchingAlgorithms__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_algorithms_SearchingAlgorithms__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _algorithms_GraphAlgorithms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./algorithms/GraphAlgorithms */ \"(app-pages-browser)/./components/algorithms/GraphAlgorithms.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction AlgorithmVisualizer() {\n    _s();\n    const [activeTab, setActiveTab] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"sorting\");\n    const renderContent = ()=>{\n        switch(activeTab){\n            case \"sorting\":\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_algorithms_SortingAlgorithms__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                    fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                    lineNumber: 16,\n                    columnNumber: 16\n                }, this);\n            case \"searching\":\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_algorithms_SearchingAlgorithms__WEBPACK_IMPORTED_MODULE_5___default()), {}, void 0, false, {\n                    fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 16\n                }, this);\n            case \"graph\":\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_algorithms_GraphAlgorithms__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                    fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 16\n                }, this);\n            default:\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_algorithms_SortingAlgorithms__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                    fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 16\n                }, this);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-gray-900 text-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"container mx-auto px-6 py-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_TabNavigation__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        activeTab: activeTab,\n                        setActiveTab: setActiveTab\n                    }, void 0, false, {\n                        fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-8\",\n                        children: renderContent()\n                    }, void 0, false, {\n                        fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                        lineNumber: 31,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"F:\\\\webdoan\\\\CTDT-GT\\\\components\\\\AlgorithmVisualizer.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\n_s(AlgorithmVisualizer, \"PHkrP+MnCVYMiKty8ZTwCim+MUY=\");\n_c = AlgorithmVisualizer;\nvar _c;\n$RefreshReg$(_c, \"AlgorithmVisualizer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvQWxnb3JpdGhtVmlzdWFsaXplci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRWlDO0FBQ0g7QUFDYztBQUNtQjtBQUNJO0FBQ1I7QUFFNUMsU0FBU007O0lBQ3RCLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUUzQyxNQUFNUyxnQkFBZ0I7UUFDcEIsT0FBUUY7WUFDTixLQUFLO2dCQUNILHFCQUFPLDhEQUFDSixxRUFBaUJBOzs7OztZQUMzQixLQUFLO2dCQUNILHFCQUFPLDhEQUFDQyx3RUFBbUJBOzs7OztZQUM3QixLQUFLO2dCQUNILHFCQUFPLDhEQUFDQyxtRUFBZUE7Ozs7O1lBQ3pCO2dCQUNFLHFCQUFPLDhEQUFDRixxRUFBaUJBOzs7OztRQUM3QjtJQUNGO0lBRUEscUJBQ0UsOERBQUNPO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDViwrQ0FBTUE7Ozs7OzBCQUNQLDhEQUFDUztnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNULHNEQUFhQTt3QkFBQ0ssV0FBV0E7d0JBQVdDLGNBQWNBOzs7Ozs7a0NBQ25ELDhEQUFDRTt3QkFBSUMsV0FBVTtrQ0FDWkY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtYO0dBM0J3Qkg7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9BbGdvcml0aG1WaXN1YWxpemVyLnRzeD8xMjc2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcbmltcG9ydCBUYWJOYXZpZ2F0aW9uIGZyb20gJy4vVGFiTmF2aWdhdGlvbic7XG5pbXBvcnQgU29ydGluZ0FsZ29yaXRobXMgZnJvbSAnLi9hbGdvcml0aG1zL1NvcnRpbmdBbGdvcml0aG1zJztcbmltcG9ydCBTZWFyY2hpbmdBbGdvcml0aG1zIGZyb20gJy4vYWxnb3JpdGhtcy9TZWFyY2hpbmdBbGdvcml0aG1zJztcbmltcG9ydCBHcmFwaEFsZ29yaXRobXMgZnJvbSAnLi9hbGdvcml0aG1zL0dyYXBoQWxnb3JpdGhtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFsZ29yaXRobVZpc3VhbGl6ZXIoKSB7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZSgnc29ydGluZycpO1xuXG4gIGNvbnN0IHJlbmRlckNvbnRlbnQgPSAoKSA9PiB7XG4gICAgc3dpdGNoIChhY3RpdmVUYWIpIHtcbiAgICAgIGNhc2UgJ3NvcnRpbmcnOlxuICAgICAgICByZXR1cm4gPFNvcnRpbmdBbGdvcml0aG1zIC8+O1xuICAgICAgY2FzZSAnc2VhcmNoaW5nJzpcbiAgICAgICAgcmV0dXJuIDxTZWFyY2hpbmdBbGdvcml0aG1zIC8+O1xuICAgICAgY2FzZSAnZ3JhcGgnOlxuICAgICAgICByZXR1cm4gPEdyYXBoQWxnb3JpdGhtcyAvPjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiA8U29ydGluZ0FsZ29yaXRobXMgLz47XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS05MDAgdGV4dC13aGl0ZVwiPlxuICAgICAgPEhlYWRlciAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBweC02IHB5LThcIj5cbiAgICAgICAgPFRhYk5hdmlnYXRpb24gYWN0aXZlVGFiPXthY3RpdmVUYWJ9IHNldEFjdGl2ZVRhYj17c2V0QWN0aXZlVGFifSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LThcIj5cbiAgICAgICAgICB7cmVuZGVyQ29udGVudCgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkhlYWRlciIsIlRhYk5hdmlnYXRpb24iLCJTb3J0aW5nQWxnb3JpdGhtcyIsIlNlYXJjaGluZ0FsZ29yaXRobXMiLCJHcmFwaEFsZ29yaXRobXMiLCJBbGdvcml0aG1WaXN1YWxpemVyIiwiYWN0aXZlVGFiIiwic2V0QWN0aXZlVGFiIiwicmVuZGVyQ29udGVudCIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/AlgorithmVisualizer.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/algorithms/SearchingAlgorithms.tsx":
/*!*******************************************************!*\
  !*** ./components/algorithms/SearchingAlgorithms.tsx ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});