'use strict';

// Utilities:
var _ = require('lodash');

// Module:
var FeatureEditor = require('../FeatureEditor');

// Dependencies:
require('./StepDeclarationModel');
require('./ExampleModel');

var createScenarioModelConstructor = function (
    StepDeclarationModel,
    ExampleModel,
    FeatureIndent,
    FeatureNewLine
) {
    var ScenarioModel = function ScenarioModel () {
        var stepDeclarations = [];
        var examples = [];

        Object.defineProperties(this, {
            stepDeclarations: {
                get: function () {
                    return stepDeclarations;
                }
            },
            examples: {
                get: function () {
                    return examples;
                }
            },
            exampleVariables: {
                get: function () {
                    return getExampleVariables.call(this, this.stepDeclarations);
                }
            },
            featureString: {
                get: function () {
                    return toFeatureString.call(this);
                }
            }
        });

        this.name = '';
    };

    ScenarioModel.prototype.addStepDeclaration = function () {
        this.stepDeclarations.push(new StepDeclarationModel());
    };

    ScenarioModel.prototype.removeStepDeclaration = function (stepDeclaration) {
        _.remove(this.stepDeclarations, stepDeclaration);
    };

    ScenarioModel.prototype.addExample = function () {
        this.examples.push(new ExampleModel(this));
    };

    ScenarioModel.prototype.removeExample = function (example) {
        _.remove(this.examples, example);
    };

    return ScenarioModel;

    function getExampleVariables (stepDeclarations) {
        return _.chain(stepDeclarations)
        .pluck('step')
        .map(StepDeclarationModel.getExampleVariableNames)
        .flatten()
        .unique().value();
    }

    function toFeatureString () {
        var scenario = 'Scenario' + (this.examples.length ? ' Outline' : '') + ': ' + this.name;

        var stepDeclarations = _.map(this.stepDeclarations, function (stepDeclaration) {
            return FeatureIndent + FeatureIndent + stepDeclaration.feature;
        });

        var lines = [scenario, stepDeclarations];

        if (this.examples.length) {
            lines.push(FeatureIndent + FeatureIndent + 'Examples:');
            var variables = '| ' + this.exampleVariables.join(' | ') + ' |';
            lines.push(FeatureIndent + FeatureIndent + FeatureIndent + variables);
            _.each(this.examples, function (example) {
                lines.push(example.feature);
            }, this);
        }

        lines = _.flatten(lines);
        return lines.join(FeatureNewLine);
    }
};

FeatureEditor.factory('ScenarioModel', function (
    StepDeclarationModel,
    ExampleModel,
    FeatureIndent,
    FeatureNewLine
) {
    return createScenarioModelConstructor(StepDeclarationModel, ExampleModel, FeatureIndent, FeatureNewLine);
});
