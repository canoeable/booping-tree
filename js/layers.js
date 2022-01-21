addLayer("p", {
    name: "Superboops", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "superboops", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('m', 11)) mult = mult.times(upgradeEffect('m', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for superboops", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    autoUpgrade() {
        if (hasUpgrade('m', 12)) {
            return true
        } else {
            return false
        }
    },
    passiveGeneration() {
        if (hasUpgrade('m', 13)) {
            return new Decimal (1)
        } else {
            return new Decimal (0)
        }
    },
    directMult() {
        dmult = new Decimal (1)
        if (hasUpgrade('p', 15)) {
            dmult = dmult.times(3)
        } else {
            dmult = dmult
        }
        return dmult
    },
    upgrades: {
        11: {
            title: "upgrade row 1 col 1",
            description: "it has an effect.. figure it out. capped at x125",
            cost: new Decimal (1),
            effect() {
                if (player[this.layer].points.add(1).gte(125)) {
                    return 125
                } else {
                    return player[this.layer].points.add(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "titles are hard to think of",
            description: "upgrade 11 is applied again, but the boost is x0.2. capped at x50",
            cost: new Decimal (15),
            effect() {
                if (player[this.layer].points.times(0.2).add(1).gte(50)) {
                    return 50
                } else {
                    return player[this.layer].points.times(0.2).add(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (hasUpgrade('p', 11)) {
                    return true
                } else {
                    return false
                }
            }
        },
        13: {
            title: "upgrade",
            description: "shiny new effect!! capped at x1000",
            cost: new Decimal (1000),
            effect() {
                if (player[this.layer].points.pow(0.05).add(1).gte(1000)) {
                    return 1000
                } else {
                    return player[this.layer].points.pow(0.05).add(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (hasUpgrade('p', 12)) {
                    return true
                } else {
                    return false
                }
            }
        },
        14: {
            title: "boost!",
            description: "points are multiplied by (1.001^superboops)+1. capped at x500",
            cost: new Decimal (2000),
            effect() {
                if (new Decimal (1.001).pow(player[this.layer].points).add(1).gte(500)) {
                    return 500
                } else {
                    return new Decimal (1.001).pow(player[this.layer].points).add(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() {
                if (hasUpgrade('p', 13)) {
                    return true
                } else {
                    return false
                }
            }
        },
        15: {
            title: "lol",
            description: "Multiplies point generation by 0",
            cost: new Decimal (50000),
            unlocked() {
                if (hasUpgrade('p', 14)) {
                    return true
                } else {
                    return false
                }
            }
        },
        21: {
            title: "finally!",
            description: "new layer!",
            cost: new Decimal (1),
            unlocked() {
                if (player[this.layer].points.gte(250001)) {
                    return true
                } else {
                    if (hasUpgrade('p', 21)) {
                        return true 
                    } else {
                        return false
                    }
                }
            }
        },
    }
})
addLayer("m", {
    name: "Megaboops", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#047562",
    requires: new Decimal(250000), // Can be a function that takes requirement increases into account
    resource: "megaboops", // Name of prestige currency
    baseResource: "superboops", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Megaboops", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        if ((hasUpgrade('p', 21))) {
            return true
        } else {
            if (player[this.layer].points.gte(1)) {
                return true
            } else {
                return false
            }
        } 
    },
    branches: 'p',
    effect() {
        if (player[this.layer].points.times(3).gte(1)) {
            if (player[this.layer].points.times(3).gte(333)) {
                return 333
            } else {
                return player[this.layer].points.times(3)
            }
        } else {
            return 1
        }
    },
    effectDescription() {
        return "multiplying point gain by " + format(tmp[this.layer].effect)
    },
    directMult() {
        dmult = new Decimal (1)
        dmult = dmult.times(layers.b.effect())
        return dmult
    },
    upgrades: {
        11: {
            title: "upgrades",
            description: "boosts superboops based on megaboops",
            cost: new Decimal (1),
            effect() {
                if (player[this.layer].points.add(1).gte(10)) {
                    return 10
                } else {
                    return player[this.layer].points.add(1)
                }
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        12: {
            title: "want automation?",
            description: "autobuy S upgrades",
            cost: new Decimal (3),
            unlocked() {
                if (hasUpgrade('m', 11)) {
                    return true
                } else {
                    return false
                }
            }
        },
        13: {
            title: "true automation",
            description: "gain 100% of S gain on reset!",
            cost: new Decimal (10),
            unlocked() {
                if (hasUpgrade('m', 12)) {
                    return true
                } else {
                    return false
                }
            }
        },
    }
})
addLayer("b", {
    name: "megaboosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#047562",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "megaboosters", // Name of prestige currency
    baseResource: "megaboops", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for megaboosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){
        if (player.m.points.gte(20)) {
            return true
        } else {
            if (player[this.layer].total.gte(1)) {
                return true
            } else {
                return false
            }
        } 
    },
    branches: 'm',
    effect() {
        if (player.b.points.pow(2).gte(1)) {
            if (player.b.points.pow(2).gte(256)) {
                return 256
            } else {
                return player.b.points.pow(2)
            }
        } else {
            return 1
        }
    },
    effectDescription() {
        return "multiplying megaboop gain by " + format(tmp[this.layer].effect)
    }
})
