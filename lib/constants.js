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
 * @file        /lib/constants.js
 * @version     0.3.0
 * @author      Claude (Godlike AI Operator)
 * @description Configuration centralisée G.H.O.S.T.
 *              Adapté depuis NEXUS v0.10.1-HOTFIX
 * 
 * @usage
 *   import { CONFIG } from "/lib/constants.js";
 *   const reserved = CONFIG.RAM.RESERVED_HOME_RAM;
 * 
 * @changelog
 *   v0.3.0 - 2025-01-XX - G.H.O.S.T. v0.3.0 NEXUS Fusion
 *            - Adapté depuis NEXUS v0.10.1
 *            - Configuration G.H.O.S.T. complète
 *            - RESERVED_HOME_RAM fixe 64GB
 */

export const CONFIG = {
    // ════════════════════════════════════════════════════
    // VERSION
    // ════════════════════════════════════════════════════
    
    VERSION: {
        MAJOR: 0,
        MINOR: 3,
        PATCH: 0,
        TAG: "NEXUS-FUSION",
        FULL: "v0.3.0-NEXUS-FUSION",
        DATE: "2026-03-14"
    },
    
    // ════════════════════════════════════════════════════
    // SYSTEM
    // ════════════════════════════════════════════════════
    
    SYSTEM: {
        DEBUG_MODE: false,
        LOG_LEVEL: "INFO"
    },
    
    // ════════════════════════════════════════════════════
    // RAM MANAGEMENT - CRITIQUE
    // ════════════════════════════════════════════════════
    
    RAM: {
        // ✅ RÉSERVE HOME : Évite crash après hard reset
        RESERVED_HOME_RAM: 64,  // GB (fixe, sécuritaire)
        
        MIN_FREE_RAM_FOR_DEPLOY: 8,
        WORKER_SCRIPT_RAM: {
            HACK: 1.7,
            GROW: 1.75,
            WEAKEN: 1.75
        }
    },
    
    // ════════════════════════════════════════════════════
    // HACKING
    // ════════════════════════════════════════════════════
    
    HACKING: {
        MIN_TARGET_MONEY: 50000000,  // $50M minimum
        PREP_MONEY_THRESHOLD: 0.95,
        PREP_SECURITY_MARGIN: 5,
        
        TOOL_FILES: {
            BRUTESSH: 'BruteSSH.exe',
            FTPCRACK: 'FTPCrack.exe',
            RELAYSMTP: 'relaySMTP.exe',
            HTTPWORM: 'HTTPWorm.exe',
            SQLINJECT: 'SQLInject.exe'
        }
    },
    
    // ════════════════════════════════════════════════════
    // SERVERS (Matrix naming)
    // ════════════════════════════════════════════════════
    
    SERVERS: {
        MAX_PURCHASED: 25,
        BASE_PREFIX: 'ghost-',  // Préfixe si pas Matrix names
        MAX_RAM_PER_SERVER: 1048576,  // 1PB
        UPGRADE_INTERVAL_MS: 120000,  // 2min (server-manager)
        MIN_MONEY_FOR_PURCHASE: 55000  // $55k (8GB server)
    },
    
    // ════════════════════════════════════════════════════
    // TARGET SELECTOR
    // ════════════════════════════════════════════════════
    
    TARGET_SELECTOR: {
        // Poids pour algorithme scoring
        MONEY_WEIGHT: 0.4,
        SPEED_WEIGHT: 0.3,
        CHANCE_WEIGHT: 0.2,
        SECURITY_WEIGHT: 0.1,
        
        // Profit/s calculation
        DEFAULT_HACK_PERCENT: 0.10
    },
    
    // ════════════════════════════════════════════════════
    // WORKERS
    // ════════════════════════════════════════════════════
    
    WORKERS: {
        HACK: '/workers/hack.js',
        GROW: '/workers/grow.js',
        WEAKEN: '/workers/weaken.js',
        
        // Distribution strategy
        WEAKEN_PERCENT: 0.5,
        GROW_PERCENT: 0.3,
        HACK_PERCENT: 0.2
    },
    
    // ════════════════════════════════════════════════════
    // DAEMONS
    // ════════════════════════════════════════════════════
    
    DAEMONS: {
        TELEMETRY_INTERVAL_MS: 30000,     // 30s
        AUTO_SPIDER_INTERVAL_MS: 300000,  // 5min
        SERVER_MANAGER_INTERVAL_MS: 120000 // 2min
    }
};
