# 📤 Comandos para Subir MyBucket a GitHub

## Paso 1: Inicializar Git (si no está inicializado)

```bash
git init
```

## Paso 2: Agregar todos los archivos al staging

```bash
git add .
```

## Paso 3: Hacer el primer commit

```bash
git commit -m "Initial commit: MyBucket portfolio project"
```

## Paso 4: Crear repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Haz clic en el botón **"+"** (arriba a la derecha) → **"New repository"**
3. Nombre del repositorio: `mybucket` (o el que prefieras)
4. Descripción: "MyBucket - Portfolio personal interactivo"
5. **NO marques** "Initialize this repository with a README" (ya tenemos uno)
6. Haz clic en **"Create repository"**

## Paso 5: Conectar con el repositorio remoto

**Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub:**

```bash
git remote add origin https://github.com/TU_USUARIO/mybucket.git
```

O si prefieres usar SSH (si tienes configuradas las claves SSH):

```bash
git remote add origin git@github.com:TU_USUARIO/mybucket.git
```

## Paso 6: Verificar la rama principal (main o master)

```bash
git branch -M main
```

## Paso 7: Subir el código a GitHub

```bash
git push -u origin main
```

---

## 🔄 Comandos para futuros cambios

Una vez que el proyecto esté en GitHub, para subir cambios futuros:

```bash
# 1. Ver qué archivos han cambiado
git status

# 2. Agregar los archivos modificados
git add .

# 3. Hacer commit con un mensaje descriptivo
git commit -m "Descripción de los cambios realizados"

# 4. Subir los cambios
git push
```

---

## 📝 Ejemplo de mensajes de commit útiles

```bash
git commit -m "feat: agregar nueva sección de proyectos"
git commit -m "fix: corregir responsive en móviles"
git commit -m "style: actualizar colores del tema"
git commit -m "docs: actualizar README con nuevas instrucciones"
```

---

## ⚠️ Si ya tienes un repositorio remoto configurado

Para verificar si ya tienes un remoto configurado:

```bash
git remote -v
```

Si necesitas cambiar la URL del remoto:

```bash
git remote set-url origin https://github.com/TU_USUARIO/mybucket.git
```

---

## 🎯 Resumen rápido (todo en uno)

```bash
git init
git add .
git commit -m "Initial commit: MyBucket portfolio project"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/mybucket.git
git push -u origin main
```

**¡Recuerda reemplazar `TU_USUARIO` con tu nombre de usuario real de GitHub!**
