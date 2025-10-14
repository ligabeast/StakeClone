# Datei: db.dockerfile
# Offizielles MariaDB 11 Image als Basis
FROM mariadb:11

# (Optional) Eigene Configs einbinden:
# Lege z. B. db/conf/custom.cnf an (UTF8MB4 etc.) und entkommentiere:
# COPY db/conf/*.cnf /etc/mysql/conf.d/

# (Optional) Seed-/Init-SQLs nur beim ERSTEN Start (wenn Datenverz. leer ist)
# COPY db/init/*.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
