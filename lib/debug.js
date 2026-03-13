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
 * @file        /lib/debug.js
 * @version     0.1.0
 * @author      Claude (Godlike AI Operator)
 * @description Système DEBUG multi-niveaux réutilisable
 *              Gère logging conditionnel, toasts, couleurs, timing
 * 
 * @usage
 *   import { Debug } from "/lib/debug.js";
 *   const debug = new Debug(ns, debugLevel);
 *   debug.log(Debug.NORMAL, "Message important");
 *   debug.verbose("Détails techniques");
 *   debug.toast("Succès !", "success");
 * 
 * @changelog
 *   v0.1.0 - 2025-01-XX - Initial release
 *            - 4 niveaux de verbosité (SILENT, NORMAL, VERBOSE, ULTRA)
 *            - Méthodes helper (log, verbose, ultra)
 *            - Intégration ns.toast() avec icônes
 *            - Timing et metrics helpers
 *            - Support couleurs et emojis
 */

// ═══════════════════════════════════════════════════════════════════════
// DEBUG LEVELS (Constants)
// ═══════════════════════════════════════════════════════════════════════
export const DEBUG_SILENT = 0;   // Toasts succès uniquement, pas de logs
export const DEBUG_NORMAL = 1;   // Infos importantes (défaut production)
export const DEBUG_VERBOSE = 2;  // Détails + metrics + timing
export const DEBUG_ULTRA = 3;    // Tout (debug complet)

// ═══════════════════════════════════════════════════════════════════════
// TOAST TYPES
// ═══════════════════════════════════════════════════════════════════════
export const TOAST_SUCCESS = "success";
export const TOAST_ERROR = "error";
export const TOAST_INFO = "info";
export const TOAST_WARNING = "warning";

// ═══════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════
export const ICONS = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
    money: "💰",
    network: "🌐",
    performance: "⚡",
    security: "🔒",
    target: "🎯",
    rocket: "🚀",
    checkmark: "✔️",
    cross: "✖️",
    clock: "⏱️",
    fire: "🔥",
    star: "⭐"
};

// ═══════════════════════════════════════════════════════════════════════
// DEBUG CLASS
// ═══════════════════════════════════════════════════════════════════════
export class Debug {
    /**
     * Constructeur
     * @param {NS} ns - Namespace Bitburner
     * @param {number} level - Niveau debug (0-3)
     * @param {boolean} autoTail - Activer ns.tail() automatiquement
     */
    constructor(ns, level = DEBUG_NORMAL, autoTail = true) {
        this.ns = ns;
        this.level = level;
        
        // Auto-tail si demandé
        if (autoTail) {
            ns.disableLog("ALL");
            ns.tail();
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // STATIC GETTERS (pour utiliser Debug.NORMAL au lieu de DEBUG_NORMAL)
    // ═══════════════════════════════════════════════════════════════════
    static get SILENT() { return DEBUG_SILENT; }
    static get NORMAL() { return DEBUG_NORMAL; }
    static get VERBOSE() { return DEBUG_VERBOSE; }
    static get ULTRA() { return DEBUG_ULTRA; }
    
    // ═══════════════════════════════════════════════════════════════════
    // CORE: LOG CONDITIONNEL
    // ═══════════════════════════════════════════════════════════════════
    /**
     * Log si niveau debug suffisant
     * @param {number} requiredLevel - Niveau requis
     * @param {string} message - Message à logger
     * @param {boolean} timestamp - Ajouter timestamp ?
     */
    log(requiredLevel, message, timestamp = false) {
        if (this.level >= requiredLevel) {
            const msg = timestamp 
                ? `[${new Date().toLocaleTimeString()}] ${message}`
                : message;
            this.ns.print(msg);
        }
    }
    
    /**
     * Log niveau NORMAL (helper)
     * @param {string} message
     */
    normal(message) {
        this.log(DEBUG_NORMAL, message);
    }
    
    /**
     * Log niveau VERBOSE (helper)
     * @param {string} message
     */
    verbose(message) {
        this.log(DEBUG_VERBOSE, message);
    }
    
    /**
     * Log niveau ULTRA (helper)
     * @param {string} message
     */
    ultra(message) {
        this.log(DEBUG_ULTRA, message);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // TOAST HELPERS
    // ═══════════════════════════════════════════════════════════════════
    /**
     * Afficher toast (sauf si SILENT)
     * @param {string} message
     * @param {string} type - success/error/info/warning
     * @param {number} duration - Durée en ms
     */
    toast(message, type = TOAST_INFO, duration = 3000) {
        if (this.level > DEBUG_SILENT) {
            this.ns.toast(message, type, duration);
        }
    }
    
    /**
     * Toast succès
     * @param {string} message
     */
    toastSuccess(message) {
        this.toast(`${ICONS.success} ${message}`, TOAST_SUCCESS, 5000);
    }
    
    /**
     * Toast erreur
     * @param {string} message
     */
    toastError(message) {
        this.toast(`${ICONS.error} ${message}`, TOAST_ERROR, 8000);
    }
    
    /**
     * Toast warning
     * @param {string} message
     */
    toastWarning(message) {
        this.toast(`${ICONS.warning} ${message}`, TOAST_WARNING, 5000);
    }
    
    /**
     * Toast info
     * @param {string} message
     */
    toastInfo(message) {
        this.toast(`${ICONS.info} ${message}`, TOAST_INFO, 3000);
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // TIMING HELPERS
    // ═══════════════════════════════════════════════════════════════════
    /**
     * Démarrer timer
     * @returns {number} Timestamp start
     */
    startTimer() {
        return Date.now();
    }
    
    /**
     * Fin timer et log elapsed
     * @param {number} startTime
     * @param {string} label
     * @param {number} logLevel
     */
    endTimer(startTime, label = "Operation", logLevel = DEBUG_VERBOSE) {
        const elapsed = Date.now() - startTime;
        this.log(logLevel, `${ICONS.clock} ${label} completed in ${elapsed}ms`);
        return elapsed;
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // DISPLAY HELPERS
    // ═══════════════════════════════════════════════════════════════════
    /**
     * Header avec séparateur
     * @param {string} title
     */
    header(title) {
        this.log(DEBUG_NORMAL, "╔═══════════════════════════════════════════════════════════╗");
        this.log(DEBUG_NORMAL, `║   ${title.padEnd(57, " ")}║`);
        this.log(DEBUG_NORMAL, "╚═══════════════════════════════════════════════════════════╝");
    }
    
    /**
     * Séparateur simple
     */
    separator() {
        this.log(DEBUG_VERBOSE, "─────────────────────────────────────────────────────────────");
    }
    
    /**
     * Clear log (si VERBOSE+)
     */
    clear() {
        if (this.level >= DEBUG_VERBOSE) {
            this.ns.clearLog();
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════
    // METRICS HELPERS
    // ═══════════════════════════════════════════════════════════════════
    /**
     * Log money avec formatage
     * @param {number} amount
     * @param {string} label
     */
    money(amount, label = "Money") {
        this.log(DEBUG_NORMAL, 
            `${ICONS.money} ${label}: $${this.ns.formatNumber(amount)}`);
    }
    
    /**
     * Log performance metric
     * @param {string} metric
     * @param {number} value
     */
    metric(metric, value) {
        this.log(DEBUG_VERBOSE, 
            `${ICONS.performance} ${metric}: ${this.ns.formatNumber(value)}`);
    }
    
    /**
     * Get debug level name
     * @returns {string}
     */
    getLevelName() {
        switch(this.level) {
            case DEBUG_SILENT: return "SILENT";
            case DEBUG_NORMAL: return "NORMAL";
            case DEBUG_VERBOSE: return "VERBOSE";
            case DEBUG_ULTRA: return "ULTRA";
            default: return "UNKNOWN";
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════
// STANDALONE HELPER FUNCTIONS (pour usage sans classe)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Parse debug level depuis args
 * @param {any[]} args - ns.args
 * @param {number} defaultLevel - Niveau par défaut
 * @returns {number}
 */
export function parseDebugLevel(args, defaultLevel = DEBUG_NORMAL) {
    const debugIndex = args.indexOf("--debug");
    if (debugIndex !== -1 && args[debugIndex + 1] !== undefined) {
        const level = parseInt(args[debugIndex + 1]);
        if (level >= 0 && level <= 3) {
            return level;
        }
    }
    return defaultLevel;
}

/**
 * Format timestamp
 * @returns {string} HH:MM:SS
 */
export function formatTime() {
    return new Date().toLocaleTimeString();
}

/**
 * Format durée en ms vers string lisible
 * @param {number} ms
 * @returns {string}
 */
export function formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms/1000).toFixed(1)}s`;
    return `${(ms/60000).toFixed(1)}m`;
}
