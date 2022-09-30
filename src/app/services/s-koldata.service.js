"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var aws_amplify_1 = require("aws-amplify");
var SKoldataService = /** @class */ (function () {
    function SKoldataService(httpClient, route) {
        this.httpClient = httpClient;
        this.route = route;
        this.REST_URL = 
        // "https://id3g8l5xp7.execute-api.us-east-1.amazonaws.com/Stage/hellokeywords=lasik";
        "https://dkkj5bhx4f.execute-api.us-east-1.amazonaws.com/Stage/hello";
        this.LOCAL_JSON_URL = "../assets/data/koldata-2.json";
        this.GENERAL_REST_URL = "https://jsonplaceholder.typicode.com/posts";
        this.REST_URL_KOL = "https://dkkj5bhx4f.execute-api.us-east-1.amazonaws.com/Stage/estoauthors";
    }
    SKoldataService.prototype.getJsonData = function () {
        var localdata = this.httpClient.get(this.LOCAL_JSON_URL);
        return localdata;
    };
    SKoldataService.prototype.getJsonDataFromServer = function (searchKey) {
        /* ** Function parseQueryParam to parse the Key value pair from query parameters
    ** @return the Json object with key value pair
    **   Example parseQueryParam(hash)  returns JsonObject: {"id_token":"xxxxx","expires_in":"xxxx","token_type":"xxx"}
    ** @Input parameters
    **   hash - hashinfo
    **   Example xxxxxx=xxxxx&xxxx=xxx&xx=x
    ** @output parameter
    **    jsonKeyValue - { xxxxx : "xxxx"}
    */
        var parseQueryParam = function (hash) {
            var jsonKeyValue = {};
            return (jsonKeyValue =
                hash.split('&').reduce(function (jsonKeyValue, item) {
                    var parts = item.split('=');
                    jsonKeyValue[parts[0]] = parts[1];
                    return jsonKeyValue;
                }, {}));
        };
        /* ** Function getKeyValue to get the user info from the json object
         ** @return the value retrieved from the key-value pair
         **   Example getKeyValuejsonObj, "preferred_username" returns xxxx
         ** @Input parameters
         **   jsonObj - Object with list of json key value pairs.
         **       Example JsonObject: {"id_token":"xxxxx"}
         **   Key - The key for which the value has to be reterived.
         **       Example Key "id_token"}
         */
        var getKeyValue = function (jsonObj, key) { return jsonObj[key] || null; };
        var getAuthToken = function () { return aws_amplify_1.Auth.currentAuthenticatedUser()
            .then(function (user) {
            console.log(user);
            console.log("Token", user.signInUserSession.accessToken.jwtToken);
            return user.signInUserSession.accessToken.jwtToken;
        })["catch"](function (err) { return console.log(err); }); };
        var hashinfo = (window.location.hash).substring(1);
        var parsedQueryParameter = parseQueryParam(hashinfo);
        var token = getKeyValue(parsedQueryParameter, "id_token");
        if (!token) {
            token = getAuthToken();
            token = ((token) ? token.trim() : "");
        }
        var TOKEN_HEADER_KEY = 'Authorization';
        var TOKEN_HEADER_VALUE = 'Bearer ' + token;
        var apiheaders = new http_1.HttpHeaders()
            .set(TOKEN_HEADER_KEY, TOKEN_HEADER_VALUE);
        var parsedSearchKey = (searchKey) && searchKey.toString();
        var queryParams = "?keywords=";
        if (parsedSearchKey) {
            queryParams += parsedSearchKey;
        }
        // console.log(" URL ", this.REST_URL_KOL + queryParams);
        // var localData = this.httpClient.get<any>(this.REST_URL_KOL+queryParams, {headers: apiheaders});
        // return localData;
        // For Local host
        console.log(" URL ", this.REST_URL + queryParams);
        var localData = this.httpClient.get(this.REST_URL + queryParams);
        return localData;
    };
    SKoldataService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], SKoldataService);
    return SKoldataService;
}());
exports.SKoldataService = SKoldataService;
