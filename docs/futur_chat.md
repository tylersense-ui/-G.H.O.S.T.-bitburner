- Fixer la séquence de boot , c'est n'importe quoi, tu démarres : 
STEP 1: LAUNCH TELEMETRY DAEMON
STEP 2: SPIDER (AUTO-ROOT NETWORK)
STEP 3: TARGET SELECTOR (INITIAL RUN) - NEW v0.2.0
STEP 4: DEPLOY WORKERS
Jusque la normal tu vas me dire, sauf que je t'ai signale bizarre ca démarre en double !?
parceque moi je sais pourquoi manitenant, c'est parcequ'avant tu avait mis auto-spider en étape 4 v0.3.0 non?
et pour résoudre le problème tu l'as mis derriere blackbox !?, te disans comme ça il démarrera pas vu qu'il a pas assez de ram sur home?, parceque effectivement en v0.3.1 ca ne démarre plus en double!! pas parceque tu as résolu le problème non juste parceque tu l'as placé dans une séquence qui fait croire qu'il est résolu !
STEP 5: BLACKBOX CONTRACT SOLVER (OPTIONAL)
pour l'instant ne boot pas cra il pèse 22,5GB à l'exécution donc le mettre en dernier dans la séquence de boot
STEP 6: AUTO-SPIDER DAEMON - NEW v0.2.0
Nous voici dans le vrai probléme du démarrage en double ton auto-spider lance :  
    - STEP 1: RUN SPIDER (AUTO-ROOT)
    - STEP 2: COUNT ROOTED SERVERS
    - STEP 3: RUN TARGET SELECTOR
STEP 7: SERVER MANAGER DAEMON - NEW v0.2.0;
voilà la vrai correction à faire !! 