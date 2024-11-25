"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var auto_1 = require("chart.js/auto");
var sweetalert2_1 = require("sweetalert2");
var client_bedrock_agent_runtime_1 = require("@aws-sdk/client-bedrock-agent-runtime");
var HiddenInput_vue_1 = require("./components/HiddenInput.vue");
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    components: {
        HiddenInput: HiddenInput_vue_1.default,
    },
    setup: function () {
        var _this = this;
        var accessKey = (0, vue_1.ref)('');
        var accessSecretKey = (0, vue_1.ref)('');
        var promptId = (0, vue_1.ref)('');
        var jsonInput = (0, vue_1.ref)('');
        var selectedSample = (0, vue_1.ref)('');
        var loading = (0, vue_1.ref)(false);
        var pieChartCanvas = (0, vue_1.ref)(null);
        var myChart = (0, vue_1.ref)(null);
        var sampleJsons = [
            { "title": "Simple Pie Chart", "value": '{"data":[{"label":"A","value":30},{"label":"B","value":50},{"label":"C","value":20}]}' },
            { "title": "Complex Pie Chart 1", "value": '{"chartData":[{"label":"RedApples","value":35,"color":"#FF6384"},{"label":"GreenPears","value":25,"color":"#36A2EB"},{"label":"PurpleGrapes","value":20,"color":"#9966FF"},{"label":"YellowBananas","value":15,"color":"#FFCE56"},{"label":"OrangeOranges","value":5,"color":"#FF9F40"}]}' },
            { "title": "Complex Pie Chart 2", "value": "{\"starWarsCharacters\":[ {\"name\":\"Luke Skywalker\",\"screenTime\":12.5,\"color\":\"#3498db\"}, {\"name\":\"Darth Vader\",\"screenTime\":11.8,\"color\":\"#e74c3c\"}, {\"name\":\"Princess Leia\",\"screenTime\":9.7,\"color\":\"#9b59b6\"}, {\"name\":\"Han Solo\",\"screenTime\":10.2,\"color\":\"#34495e\"}, {\"name\":\"Obi-Wan Kenobi\",\"screenTime\":8.6,\"color\":\"#2ecc71\"}, {\"name\":\"Yoda\",\"screenTime\":7.9,\"color\":\"#27ae60\"}, {\"name\":\"Chewbacca\",\"screenTime\":6.8,\"color\":\"#795548\"}, {\"name\":\"C-3PO\",\"screenTime\":5.4,\"color\":\"#f1c40f\"}, {\"name\":\"R2-D2\",\"screenTime\":5.1,\"color\":\"#3498db\"}, {\"name\":\"Anakin Skywalker\",\"screenTime\":7.3,\"color\":\"#e67e22\"}, {\"name\":\"Palpatine\",\"screenTime\":6.5,\"color\":\"#c0392b\"}, {\"name\":\"Padm\u00E9 Amidala\",\"screenTime\":5.9,\"color\":\"#8e44ad\"}, {\"name\":\"Qui-Gon Jinn\",\"screenTime\":4.2,\"color\":\"#16a085\"}, {\"name\":\"Mace Windu\",\"screenTime\":3.8,\"color\":\"#9b59b6\"}, {\"name\":\"Lando Calrissian\",\"screenTime\":3.5,\"color\":\"#f39c12\"}, {\"name\":\"Boba Fett\",\"screenTime\":2.7,\"color\":\"#7f8c8d\"}, {\"name\":\"Jabba the Hutt\",\"screenTime\":2.1,\"color\":\"#1abc9c\"}, {\"name\":\"Count Dooku\",\"screenTime\":2.9,\"color\":\"#c0392b\"}, {\"name\":\"General Grievous\",\"screenTime\":2.4,\"color\":\"#bdc3c7\"}, {\"name\":\"Jar Jar Binks\",\"screenTime\":1.7,\"color\":\"#d35400\"} ]}" }
        ];
        (0, vue_1.onMounted)(function () {
            accessKey.value = localStorage.getItem("accessKey") || '';
            accessSecretKey.value = localStorage.getItem("accessSecretKey") || '';
            promptId.value = localStorage.getItem("promptId") || '';
            jsonInput.value = localStorage.getItem("jsonInput") || '';
        });
        var updateJsonInput = function () {
            jsonInput.value = selectedSample.value;
        };
        var generatePieChart = function () { return __awaiter(_this, void 0, void 0, function () {
            var chartInput, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!accessKey.value || !accessSecretKey.value || !promptId.value || !jsonInput.value) {
                            sweetalert2_1.default.fire("Error", "All inputs are required.", "error");
                            return [2 /*return*/];
                        }
                        try {
                            JSON.parse(jsonInput.value);
                        }
                        catch (e) {
                            sweetalert2_1.default.fire("Error", "JSON input is not valid.", "error");
                            return [2 /*return*/];
                        }
                        loading.value = true;
                        localStorage.setItem('accessKey', accessKey.value);
                        localStorage.setItem('accessSecretKey', accessSecretKey.value);
                        localStorage.setItem('promptId', promptId.value);
                        localStorage.setItem('jsonInput', jsonInput.value);
                        chartInput = "";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, invokeFlow()];
                    case 2:
                        chartInput = _a.sent();
                        renderPieChart(chartInput);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("AI Response: '".concat(chartInput, "'"));
                        console.error("Error generating pie chart:", error_1);
                        sweetalert2_1.default.fire("Error", "Failed to generate pie chart. Check the console for more details", "error");
                        return [3 /*break*/, 5];
                    case 4:
                        loading.value = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        var invokeFlow = function () { return __awaiter(_this, void 0, void 0, function () {
            var inputs, bedrockClient, command, chartInput, flowResponse, response, _a, _b, _c, chunkEvent, flowOutputEvent, flowCompletionEvent, e_1_1, error_2;
            var _d, e_1, _e, _f;
            var _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        inputs = [
                            {
                                content: { document: jsonInput.value },
                                nodeName: "FlowInputNode",
                                nodeOutputName: "document",
                            },
                        ];
                        bedrockClient = new client_bedrock_agent_runtime_1.BedrockAgentRuntimeClient({
                            region: "us-east-1",
                            credentials: {
                                accessKeyId: accessKey.value,
                                secretAccessKey: accessSecretKey.value,
                            },
                        });
                        command = new client_bedrock_agent_runtime_1.InvokeFlowCommand({
                            flowIdentifier: "5YIPQQ37SV",
                            flowAliasIdentifier: "02XWAF9CP3",
                            inputs: inputs,
                        });
                        chartInput = "";
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 15, , 16]);
                        flowResponse = {};
                        return [4 /*yield*/, bedrockClient.send(command)];
                    case 2:
                        response = _h.sent();
                        if (!(response && response.responseStream)) return [3 /*break*/, 14];
                        _h.label = 3;
                    case 3:
                        _h.trys.push([3, 8, 9, 14]);
                        _a = true, _b = __asyncValues(response.responseStream);
                        _h.label = 4;
                    case 4: return [4 /*yield*/, _b.next()];
                    case 5:
                        if (!(_c = _h.sent(), _d = _c.done, !_d)) return [3 /*break*/, 7];
                        _f = _c.value;
                        _a = false;
                        chunkEvent = _f;
                        flowOutputEvent = chunkEvent.flowOutputEvent, flowCompletionEvent = chunkEvent.flowCompletionEvent;
                        if (flowOutputEvent) {
                            flowResponse = __assign(__assign({}, flowResponse), flowOutputEvent);
                            chartInput = (_g = flowResponse === null || flowResponse === void 0 ? void 0 : flowResponse.content) === null || _g === void 0 ? void 0 : _g.document;
                            console.log("Chart Input = '".concat(chartInput, "'"));
                        }
                        else if (flowCompletionEvent) {
                            if (flowCompletionEvent.completionReason == 'SUCCESS') {
                                console.log("flowCompletionEvent: Success");
                            }
                            else {
                                //log(`flowCompletionEvent: ${flowCompletionEvent}`, true);
                            }
                        }
                        _h.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _h.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _h.trys.push([9, , 12, 13]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _e.call(_b)];
                    case 10:
                        _h.sent();
                        _h.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_2 = _h.sent();
                        console.error(error_2);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, (chartInput)];
                }
            });
        }); };
        var renderPieChart = function (chartConfigString) {
            if (myChart.value)
                myChart.value.destroy();
            // Parse the JSON string into a JavaScript object
            var chartConfig = JSON.parse(chartConfigString);
            pieChartCanvas.innerHTML = "";
            var ctx = pieChartCanvas.value.getContext('2d');
            myChart.value = new auto_1.default(ctx, chartConfig);
        };
        return {
            accessKey: accessKey,
            accessSecretKey: accessSecretKey,
            promptId: promptId,
            jsonInput: jsonInput,
            selectedSample: selectedSample,
            sampleJsons: sampleJsons,
            loading: loading,
            pieChartCanvas: pieChartCanvas,
            updateJsonInput: updateJsonInput,
            generatePieChart: generatePieChart,
        };
    }
}); /* PartiallyEnd: #3632/script.vue */
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_localComponents = __assign(__assign({
        HiddenInput: HiddenInput_vue_1.default,
    }, {}), __VLS_ctx);
    var __VLS_components;
    var __VLS_localDirectives = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_directives;
    var __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("bg-winter-blue text-deep-blue") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ id: ("loadingOverlay") }, { class: ("modal-overlay") }));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, __assign(__assign({}, __VLS_directiveBindingRestFields), { modifiers: {}, value: (__VLS_ctx.loading) }), null, null);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("spinner") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("container mx-auto max-w-3xl p-6") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)(__assign({ class: ("bg-ice-blue p-6 rounded-lg mb-6") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)(__assign({ class: ("text-2xl font-bold") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("mb-6") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)(__assign({ class: ("text-blue-500 underline") }, { href: ("https://www.chartjs.org/docs/latest/api/"), target: ("_blank") }));
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.HiddenInput;
    /** @type { [typeof __VLS_components.HiddenInput, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ modelValue: ((__VLS_ctx.accessKey)), label: ("Access Key"), }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{ modelValue: ((__VLS_ctx.accessKey)), label: ("Access Key"), }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.HiddenInput;
    /** @type { [typeof __VLS_components.HiddenInput, ] } */
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ modelValue: ((__VLS_ctx.accessSecretKey)), label: ("Access Secret Key"), }));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{ modelValue: ((__VLS_ctx.accessSecretKey)), label: ("Access Secret Key"), }], __VLS_functionalComponentArgsRest(__VLS_7), false));
    var __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.HiddenInput;
    /** @type { [typeof __VLS_components.HiddenInput, ] } */
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ modelValue: ((__VLS_ctx.promptId)), label: ("Prompt Id"), }));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{ modelValue: ((__VLS_ctx.promptId)), label: ("Prompt Id"), }], __VLS_functionalComponentArgsRest(__VLS_13), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ for: ("sampleJson") }, { class: ("block mb-2") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(__assign(__assign(__assign({ onChange: (__VLS_ctx.updateJsonInput) }, { id: ("sampleJson") }), { class: ("w-full p-2 border rounded") }), { value: ((__VLS_ctx.selectedSample)) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ value: (""), });
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.sampleJsons)); _i < _a.length; _i++) {
        var _b = _a[_i], sample = _b[0], index = _b[1];
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((index)), value: ((sample.value)), });
        (sample.title);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(__assign({ for: ("jsonInput") }, { class: ("block mb-2") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)(__assign(__assign({ id: ("jsonInput"), rows: ("5") }, { class: ("w-full p-2 border rounded") }), { value: ((__VLS_ctx.jsonInput)) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.generatePieChart) }, { class: ("bg-button-blue text-white p-2 rounded hover:bg-blue-700 transition duration-300") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({ ref: ("pieChartCanvas"), width: ("400"), height: ("400"), });
    // @ts-ignore navigation for `const pieChartCanvas = ref()`
    __VLS_ctx.pieChartCanvas;
    __VLS_styleScopedClasses['bg-winter-blue'];
    __VLS_styleScopedClasses['text-deep-blue'];
    __VLS_styleScopedClasses['modal-overlay'];
    __VLS_styleScopedClasses['spinner'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['max-w-3xl'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['bg-ice-blue'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['bg-button-blue'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['hover:bg-blue-700'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-300'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    var __VLS_refs = {
        "pieChartCanvas": __VLS_nativeElements['canvas'],
    };
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
var __VLS_self;
