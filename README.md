## Kørsel af projektet

### Forudsætninger
Sørg for, at du har [Node.js](https://nodejs.org/) installeret på din computer.

### Kørsel af test 
For at køre testen skal du køre `main.js`-filen:
`node main.js´

### Reflektioner
Funktionens fixTrain asymptotiske køretid er O(N), hvor N repræsenterer det samlede antal vogne i toget. Analysen kan opdeles i to primære faser:

Adskillelsesfasen: I denne fase gennemløbes den oprindelige linkede liste én gang for at sortere vognene i separate hjælpe-arrays. Da løkken kører præcis N gange, er denne fases kompleksitet O(N).

Genopbygningsfasen: Her opbygges et nyt tog ved at gennemgå hjælpe-arrays'ene og tilføje hver af de N vogne til en ny linket liste. Dermed er den samlede kompleksitet for denne fase også O(N).

Den samlede køretid er summen af de to faser, O(N)+O(N)=O(2N). Inden for Big-O notation ignoreres konstanter, hvorfor udtrykket simplificeres til O(N). Dette betyder, at funktionens køretid vokser lineært med antallet af vogne i toget.

Funktionen gennemløber kun den oprindelige liste én gang, hvilket har en betydelig fordel for dens kompleksitet og køretid. Ved at undgå løkker inde i hinanden sikrer vi, at funktionen vokser lineært med togets størrelse. Hvis vi derimod havde en løkke, der for hvert element skulle gennemløbe resten af toget igen (en nested loop), ville køretiden blive påvirket hårdt og vokse kvadratisk (O(N^2)).

Rasmus Planteig
