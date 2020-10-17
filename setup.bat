FOR /F "delims=: tokens=2" %%a in ('systeminfo ^| find "Hostname"') do set _IPAddress=%%a
set _IPAddress=%_IPAddress:~38%
ECHO REACT_APP_API_HOST=http://%_IPAddress%/praystorm-beamer-backend/api > "praystorm-beamer-frontend\.env"
ECHO REACT_APP_SOCKET_HOST=http://%_IPAddress%:4001 >> "praystorm-beamer-frontend\.env"
xampp\xampp_start.exe
start "" https://stackoverflow.com
praystorm-beamer-socket\praystorm-beamer-socket.exe