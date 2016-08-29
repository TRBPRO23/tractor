'use strict';

// Utilities:
var _ = require('lodash');
var assert = require('assert');

// Module:
var ComponentEditor = require('../ComponentEditor');

// Dependencies:
require('../../../Core/Services/PersistentStateService');
require('../Services/ElementParserService');
require('../Services/ActionParserService');
require('../Models/ComponentModel');

var ComponentParserService = function ComponentParserService (
    persistentStateService,
    ElementParserService,
    ActionParserService,
    ComponentModel
) {
    return {
        parse: parse
    };

    function parse (componentFile) {
        try {
            var ast = componentFile.ast;
            var meta = JSON.parse(_.first(ast.comments).value);

            var component = new ComponentModel({
                isSaved: true,
                path: componentFile.path
            });
            component.name = meta.name;
            var state = persistentStateService.get(component.name);

            var componentModuleExpressionStatement = _.first(ast.body);
            var moduleBlockStatement = componentModuleExpressionStatement.expression.right.callee.body;

            _.each(moduleBlockStatement.body, function (statement, index) {
                try {
                    assert(statement.argument.name);
                    return;
                } catch (e) { }

                try {
                    var constructorDeclarator = _.first(statement.declarations);
                    var constructorBlockStatement = constructorDeclarator.init.body;
                    _.each(constructorBlockStatement.body, function (statement) {
                        var domElement = ElementParserService.parse(component, statement);
                        assert(domElement);
                        domElement.name = meta.elements[component.domElements.length].name;
                        domElement.minimised = !!state[domElement.name];
                        component.elements.push(domElement);
                        component.domElements.push(domElement);
                    });
                    return;
                } catch (e) { }

                try {
                    var actionMeta = meta.actions[component.actions.length];
                    var action = ActionParserService.parse(component, statement, actionMeta);
                    assert(action);
                    action.name = actionMeta.name;
                    action.minimised = !!state[action.name];
                    component.actions.push(action);
                    return;
                } catch (e) { }

                console.warn('Invalid Component:', statement, index);
            });

            return component;
        } catch (e) {
            return new ComponentModel();
        }
    }
};

ComponentEditor.service('ComponentParserService', ComponentParserService);
