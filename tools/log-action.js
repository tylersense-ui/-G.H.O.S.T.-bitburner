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
 * @file        /tools/log-action.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Logger pour actions manuelles de l'opérateur
 *              Historique persistant dans /state/operator-actions.json
 * 
 * @usage
 *   run /tools/log-action.js "Achat NeuroFlux x5 pour $500m"
 *   run /tools/log-action.js "Rejoint faction Daedalus"
 *   run /tools/log-action.js "Reset avec 30 augs"
 * 
 * @commands
 *   <message>   Action à logger (texte libre)
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - G.H.O.S.T. Initial release
 *            - Renamed from NEXUS v0.11.1
 *            - Log actions avec timestamp + context (money, hacking)
 *            - Historique limité à 100 entrées
 *            - Sauvegarde JSON dans /state/
 */

import { StateManager } from "/lib/state-manager.js";

/** @param {NS} ns */
export async function main(ns) {
    const stateMgr = new StateManager(ns);
    
    if (ns.args.length === 0) {
        ns.tprint("❌ ERROR: Usage: run /tools/log-action.js \"Action description\"");
        ns.tprint("📝 Example: run /tools/log-action.js \"Bought NeuroFlux x10\"");
        return;
    }
    
    const action = ns.args.join(" ");
    
    // Charger historique existant
    let history = stateMgr.load("operator-actions.json");
    if (!history || !Array.isArray(history.actions)) {
        history = {
            framework: "G.H.O.S.T.",
            version: "0.1.0",
            actions: []
        };
    }
    
    // Ajouter nouvelle action
    const entry = {
        timestamp: new Date().toISOString(),
        action: action,
        context: {
            money: ns.getServerMoneyAvailable("home"),
            hackingLevel: ns.getHackingLevel(),
            timeSinceAug: ns.getTimeSinceLastAug()
        }
    };
    
    history.actions.push(entry);
    
    // Garder seulement les 100 dernières
    if (history.actions.length > 100) {
        history.actions = history.actions.slice(-100);
    }
    
    // Sauvegarder
    await stateMgr.save("operator-actions.json", history);
    
    ns.tprint(`✅ Action logged: ${action}`);
    ns.tprint(`📊 Context: $${ns.formatNumber(entry.context.money)} | Hack ${entry.context.hackingLevel}`);
}
