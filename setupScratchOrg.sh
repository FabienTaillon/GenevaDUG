echo '##### CREATING SCRATCH ORG #####'
sfdx force:org:create -f config/project-scratch-def.json -a GenevaDUG -s
echo '##### PUSHING METADATA #####'
sfdx force:source:push -u GenevaDUG
echo '##### ASSIGNING PERMISSIONS #####'
sfdx force:user:permset:assign -n Account_Manager -u GenevaDUG
echo '##### IMPORTING DUMMY DATA #####'
sfdx texei:data:import -d ./data -u GenevaDUG
echo '##### OPENING SCRATCH ORG #####'
sfdx force:org:open -p /lightning/o/Account/home -u GenevaDUG