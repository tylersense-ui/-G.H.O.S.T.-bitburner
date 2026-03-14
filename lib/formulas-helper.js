/**
 * ╔═══════════════════════════════════════════════════════════╗
 * ║  ██████╗ ██╗  ██╗ ██████╗ ███████╗████████╗             ║
 * ║ ██╔════╝ ██║  ██║██╔═══██╗██╔════╝╚══██╔══╝             ║
 * ║ ██║  ███╗███████║██║   ██║███████╗   ██║                ║
 * ║ ██║   ██║██╔══██║██║   ██║╚════██║   ██║                ║
 * ║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║                ║
 * ║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝                ║
 * ║                                                           ║
 * ║  Godlike Heuristic Operator & Strategy Toolkit           ║
 * ╚═══════════════════════════════════════════════════════════╝
 * 
 * @file        /lib/formulas-helper.js
 * @version     0.3.0
 * @author      Claude (Godlike AI Operator)
 * @description Helper pour Formulas.exe (calculs précis)
 *              Adapté depuis NEXUS v0.8.1
 * 
 * @usage
 *   import { FormulasHelper } from "/lib/formulas-helper.js";
 *   const formulas = new FormulasHelper(ns);
 * 
 * @changelog
 *   v0.3.0 - 2025-01-XX - G.H.O.S.T. v0.3.0 NEXUS Fusion
 *            - Adapté depuis NEXUS v0.8.1
 *            - Calculs précis avec Formulas.exe
 */

export class FormulasHelper {
    constructor(ns) {
        this.ns = ns;
        this.hasFormulas = ns.fileExists("Formulas.exe");
    }
    
    /**
     * Calculer threads HACK avec Formulas
     */
    calculateHackThreads(target, hackPercent) {
        if (!this.hasFormulas) {
            const maxMoney = this.ns.getServerMaxMoney(target);
            return Math.max(1, Math.floor(
                this.ns.hackAnalyzeThreads(target, maxMoney * hackPercent)
            ));
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        server.moneyAvailable = server.moneyMax;
        
        const hackPercentPerThread = this.ns.formulas.hacking.hackPercent(server, player);
        
        if (hackPercentPerThread === 0) {
            return 0;
        }
        
        return Math.max(1, Math.floor(hackPercent / hackPercentPerThread));
    }
    
    /**
     * Calculer threads GROW avec Formulas
     */
    calculateGrowThreads(target, hackPercent) {
        const maxMoney = this.ns.getServerMaxMoney(target);
        const moneyAfterHack = maxMoney * (1 - hackPercent);
        const growMultiplier = maxMoney / Math.max(1, moneyAfterHack);
        
        return Math.max(1, Math.ceil(
            this.ns.growthAnalyze(target, growMultiplier)
        ));
    }
    
    /**
     * Calculer timings précis avec Formulas
     */
    calculateTimings(target, buffer = 20) {
        if (!this.hasFormulas) {
            return {
                hackTime: this.ns.getHackTime(target),
                growTime: this.ns.getGrowTime(target),
                weakenTime: this.ns.getWeakenTime(target),
                hackDelay: 0,
                weaken1Delay: 50,
                growDelay: 100,
                weaken2Delay: 150
            };
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        server.moneyAvailable = server.moneyMax;
        
        const hackTime = this.ns.formulas.hacking.hackTime(server, player);
        const growTime = this.ns.formulas.hacking.growTime(server, player);
        const weakenTime = this.ns.formulas.hacking.weakenTime(server, player);
        
        const now = Date.now();
        const endTime = now + weakenTime + (buffer * 4);
        
        const hackDelay = Math.max(0, endTime - now - hackTime - (buffer * 3));
        const weaken1Delay = Math.max(0, endTime - now - weakenTime - (buffer * 2));
        const growDelay = Math.max(0, endTime - now - growTime - buffer);
        const weaken2Delay = 0;
        
        return {
            hackTime,
            growTime,
            weakenTime,
            hackDelay,
            weaken1Delay,
            growDelay,
            weaken2Delay
        };
    }
    
    /**
     * Calculer chance de hack avec Formulas
     */
    getHackChance(target) {
        if (!this.hasFormulas) {
            return this.ns.hackAnalyzeChance(target);
        }
        
        const server = this.ns.getServer(target);
        const player = this.ns.getPlayer();
        
        server.hackDifficulty = server.minDifficulty;
        
        return this.ns.formulas.hacking.hackChance(server, player);
    }
}
