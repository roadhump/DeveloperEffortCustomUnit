/*globals tau*/
/*eslint quotes:[2, "single"] */
tau
    .mashups
    .addDependency('Underscore')
    .addDependency('jQuery')
    .addDependency('tau/configurator')
    .addDependency('tau/models/board.customize.units/const.entity.types.names')
    .addDependency('tau/models/board.customize.units/const.card.sizes')

    .addMashup(function(_, $, globalConfigurator, types, sizes) {
        'use strict';

        var style = document.createElement("style");
        style.setAttribute('id', 'DeveloperEffortCustomUnit');
        style.appendChild(document.createTextNode(""));

        document.head.appendChild(style);

        var sheet = style.sheet;

        var addCSSRule = function(selector, rules, index) {
            if (sheet.insertRule) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            } else {
                sheet.addRule(selector, rules, index);
            }
        };

        addCSSRule('.tau-card-v2__section .tau-board-unit_type_developer_effort',
            'position: absolute; left:0; right: 0; bottom: 0; top: 0; ' +
            'display: -webkit-flex; display: -ms-flex; display: flex;' +
            '-webkit-align-items: center; -ms-flex-align: center; align-items: center; ' +
            '-webkit-justify-content: center; -ms-flex-pack: center; justify-content: center;' +
            'background: transparent;'
        );

        addCSSRule('.tau-card-v2__section .tau-board-unit_type_developer_effort .tau-board-unit__value',
            'font-size: 50px; line-height: normal; opacity: 0.5;');

        addCSSRule('.tau-ui-size-xs .tau-card-v2__section .tau-board-unit_type_developer_effort .tau-board-unit__value',
            'font-size: 30px; line-height: normal; opacity: 0.5;');

        var units = [{
            id: 'developer_effort',
            name: 'Developer Effort',
            classId: 'tau-board-unit_type_developer_effort',
            types: [
                types.EPIC, types.FEATURE, types.STORY, types.TASK, types.BUG, types.TEST_PLAN, types.TEST_PLAN_RUN,
                types.REQUEST
            ],
            template: [
                '<div class="tau-board-unit__value"><%= String(Math.round(this.data.developerEffort[0] || 0)) %></div>'
            ],
            sizes: [sizes.XS, sizes.S, sizes.M, sizes.L, sizes.XL, sizes.LIST],
            sampleData: {
                developerEffort: [22]
            },
            model: 'developerEffort:RoleEfforts.Where(Role.Name = "Developer").Select(Effort)'
        }];


        function addUnits(configurator) {
            var registry = configurator.getUnitsRegistry();
            _.extend(registry.units, registry.register(units));
        }

        globalConfigurator.getGlobalBus().once('configurator.ready', function(e, configurator) {
            addUnits(configurator);
        });
    });
