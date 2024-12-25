"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
exports.InputBoxComponent = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var typeahead_1 = require("ngx-bootstrap/typeahead");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var alert_1 = require("ngx-bootstrap/alert");
var modal_1 = require("ngx-bootstrap/modal");
var fare_calculator_request_model_1 = require("./dto/request/fare-calculator-request.model");
var error_message_response_1 = require("../../dto/error/response/error-message-response");
var fare_calculator_response_model_1 = require("./dto/response/fare-calculator-response.model");
var rxjs_1 = require("rxjs");
var searchInputBox_service_1 = require("../services/searchInputBox.service");
var InputBoxComponent = /** @class */ (function () {
    function InputBoxComponent(modalService, errorHandlingService, searchInputBoxService, searchFormService) {
        this.modalService = modalService;
        this.errorHandlingService = errorHandlingService;
        this.searchInputBoxService = searchInputBoxService;
        this.searchFormService = searchFormService;
        this.rabbitCardImagePath = '../../../assets/img/RabbitCard.png';
        this.rabbitCardStudentImagePath = '../../../assets/img/RabbitCard-student.png';
        this.rabbitCardSeniorImagePath = '../../../assets/img/RabbitCard-senior.png';
        this.singleJourneyImagePath = '../../../assets/img/SingleJourney.png';
        this.onDestroy = new rxjs_1.Subject();
        this.origin = '';
        this.destination = '';
        this.type = 1;
        this.colorMap = new Map();
        this.stations = [];
        this.types = [];
        this.responseData = new fare_calculator_response_model_1.FareCalculatorResponse();
        this.messageResponse = new error_message_response_1.MessageResponse();
        // this.form = this.fb.group({
        //   origin: ['', [Validators.required, Validators.maxLength(5)]],
        //   destination: ['', [Validators.required, Validators.maxLength(5)]],
        //   type: [1, Validators.required],
        // });
    }
    InputBoxComponent.prototype.logForm = function () {
        console.log(this.form);
    };
    InputBoxComponent.prototype.ngOnInit = function () {
        this.loadStations();
        this.loadType();
        this.form = this.searchFormService.initSearchForm(this.onDestroy);
    };
    InputBoxComponent.prototype.selectedType = function (typeId) {
        // console.log(event);
        this.type = typeId;
    };
    InputBoxComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template, { "class": 'modal-lg' });
    };
    InputBoxComponent.prototype.closeModal = function () {
        var _a;
        (_a = this.modalRef) === null || _a === void 0 ? void 0 : _a.hide();
    };
    InputBoxComponent.prototype.loadStations = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.searchInputBoxService.getStations()];
                    case 1:
                        response = _a.sent();
                        this.stations = response.body;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.errorHandlingService.handleError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InputBoxComponent.prototype.loadType = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.searchInputBoxService.getType()];
                    case 1:
                        response = _a.sent();
                        this.types = response.body;
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        this.errorHandlingService.handleError(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InputBoxComponent.prototype.onSelectOrigin = function (event) {
        var _a;
        console.log(this.form);
        try {
            (_a = this.form.get('origin')) === null || _a === void 0 ? void 0 : _a.setValue(event.item.stationFullname);
            this.origin = event.item.stationName;
        }
        catch (error) {
            this.origin = '';
        }
    };
    InputBoxComponent.prototype.onSelectDestination = function (event) {
        var _a;
        try {
            (_a = this.form.get('destination')) === null || _a === void 0 ? void 0 : _a.setValue(event.item.stationFullname);
            this.destination = event.item.stationName;
        }
        catch (error) {
            this.destination = '';
        }
    };
    InputBoxComponent.prototype.getSelectedTypeDescription = function () {
        var _this = this;
        var selectedType = this.types.find(function (type) { return type.id === _this.type; });
        return selectedType ? selectedType.description : '';
    };
    InputBoxComponent.prototype.roundedUp = function (deci) {
        return Math.round(deci);
    };
    InputBoxComponent.prototype.callCalculate = function (responseModalTemplate) {
        return __awaiter(this, void 0, Promise, function () {
            var fareCalculatorRequest, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.messageResponse.clearMessage();
                        console.log(this.form);
                        fareCalculatorRequest = new fare_calculator_request_model_1.FareCalculatorRequest(this.origin, this.destination, this.type);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.searchInputBoxService.calculateFare(fareCalculatorRequest)];
                    case 2:
                        response = _a.sent();
                        this.responseData = response.body;
                        this.openModal(responseModalTemplate);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        this.messageResponse = this.errorHandlingService.handleError(error_3);
                        console.log(this.messageResponse);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    InputBoxComponent.prototype.ngOnDestroy = function () {
        this.onDestroy.next();
    };
    InputBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-input-box',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                typeahead_1.TypeaheadModule,
                dropdown_1.BsDropdownModule,
                http_1.HttpClientModule,
                alert_1.AlertModule,
                modal_1.ModalModule,
            ],
            providers: [alert_1.AlertConfig, modal_1.BsModalService, searchInputBox_service_1.SearchInputBoxService],
            templateUrl: './input-box.component.html',
            styleUrls: ['./input-box.component.css']
        })
    ], InputBoxComponent);
    return InputBoxComponent;
}());
exports.InputBoxComponent = InputBoxComponent;
