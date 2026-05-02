# Base de Datos EduCampo IA - Guía de Integración

## Estado: ✅ Completado

Se ha creado exitosamente la base de datos Supabase con todas las tablas, políticas RLS y datos de semilla para EduCampo IA.

---

## Tablas Creadas

### 1. **students** - Perfil de Estudiantes
- `id` (UUID): Identificador único
- `user_id` (UUID): Referencia a auth.users
- `first_name`, `last_name`: Nombre completo
- `grade` (1-5): Grado escolar
- `avatar_animal`: Animal elegido (vaca, gallina, caballo, etc.)
- `streak`: Días consecutivos estudiando
- `total_exercises`, `total_correct`: Estadísticas
- `study_time_minutes`: Tiempo total de estudio
- Timestamps automáticos: `created_at`, `updated_at`

### 2. **teachers** - Perfil de Docentes
- `id` (UUID): Identificador único
- `user_id` (UUID): Referencia a auth.users
- `first_name`, `last_name`: Nombre completo
- `school_name`, `subject`: Escuela y materia
- `bio`: Biografía del docente
- Timestamps automáticos

### 3. **exercises** - Banco de Ejercicios
- `id` (UUID): Identificador único
- `subject`: Materia (Matemáticas, Lectura, Ciencias Naturales)
- `difficulty`: Nivel (facil, medio, dificil)
- `question`: Texto de la pregunta
- `question_type`: Tipo (multiple_choice, short_answer, numeric)
- `options` (JSONB): Opciones para opción múltiple
- `correct_answer`: Respuesta correcta
- `explanation`: Explicación de la respuesta
- `rural_context`: Contexto rural del ejercicio

### 4. **student_answers** - Respuestas de Estudiantes
- Relaciona estudiantes con ejercicios resueltos
- Almacena: respuesta, si fue correcta, tiempo invertido

### 5. **achievements** - Logros Desbloqueados
- `student_id`: Referencia a estudiante
- `title`, `description`, `icon_type`: Detalles del logro
- `earned_at`: Fecha cuando se ganó

### 6. **chat_messages** - Historial de Chat
- Mensajes entre estudiante y tutor virtual
- `role`: 'student' o 'tutor'
- `subject_context`: Contexto de la materia
- Timestamps para cada mensaje

### 7. **product_data** - Contenido Educativo
- `product_type`: 'leccion' o 'recurso'
- `subject`: Materia
- `grade_level`: Grado escolar
- `title`, `description`: Información
- `content` (JSONB): Contenido estructurado
- `difficulty_level`: Nivel de dificultad

---

## Datos de Semilla Insertados

### Ejercicios (15 ejercicios totales)
- **Matemáticas**: 5 ejercicios (desde sumas hasta dinero)
- **Lectura**: 4 ejercicios (comprensión, vocabulario)
- **Ciencias Naturales**: 4 ejercicios (ciclo del agua, fotosíntesis, cadena alimenticia)

### Contenido Educativo (10 recursos)
- Lecciones para grades 1-3
- Recursos visuales
- Todo con contexto rural colombiano

---

## Row Level Security (RLS)

Todas las tablas tienen políticas RLS habilitadas:

| Tabla | Select | Insert | Update | Delete |
|-------|--------|--------|--------|--------|
| students | Solo propios | Solo propios | Solo propios | Solo propios |
| teachers | Solo propios | Solo propios | Solo propios | Solo propios |
| achievements | Solo de estudiante | Solo de estudiante | - | Solo de estudiante |
| exercises | Público | - | - | - |
| student_answers | Solo propios | Solo propios | - | - |
| chat_messages | Solo propios | Solo propios | - | - |
| product_data | Público | - | - | - |

---

## Funciones Disponibles en `lib/supabase-queries.ts`

### Ejercicios
- `fetchExercisesBySubject(subject, difficulty)` - Obtener ejercicios
- `fetchExerciseById(id)` - Un ejercicio específico

### Estudiantes
- `fetchOrCreateStudent(userId)` - Obtener o crear perfil
- `updateStudentProfile(userId, updates)` - Actualizar datos
- `fetchStudentStats(userId)` - Estadísticas

### Logros
- `fetchStudentAchievements(studentId)` - Historial de logros
- `addAchievement(studentId, achievement)` - Agregar logro

### Respuestas
- `saveStudentAnswer(studentId, exerciseId, answer)` - Guardar respuesta
- `fetchStudentAnswers(studentId)` - Historial de respuestas

### Chat
- `saveChatMessage(studentId, message, role, subject)` - Guardar mensaje
- `fetchChatHistory(studentId)` - Historial de conversaciones

### Contenido
- `fetchProductData(subject, gradeLevel)` - Obtener contenido
- `fetchProductDataById(id)` - Contenido específico

### Docentes
- `fetchOrCreateTeacher(userId)` - Obtener o crear perfil
- `updateTeacherProfile(userId, updates)` - Actualizar datos

---

## Variables de Entorno Necesarias

Asegúrate de que estas variables estén configuradas en `Settings > Vars`:
- `NEXT_PUBLIC_SUPABASE_URL` ✅ (automático con integración)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ (automático con integración)

---

## Próximos Pasos para Integración

1. **Actualizar páginas** para usar `fetchExercisesBySubject()` en lugar de datos mock
2. **Conectar login** con Supabase Auth
3. **Guardar progreso** usando `updateStudentProfile()` y `saveStudentAnswer()`
4. **Sincronizar chat** con `saveChatMessage()` y `fetchChatHistory()`

---

## Credenciales de Prueba

### Estudiante
- Email: `estudiante@educampo.co`
- Password: `campo123`

### Docente
- Email: `docente@educampo.co`
- Password: `profe123`

*Nota: Estos usuarios aún no están creados en auth.users. Se pueden registrar nuevamente con estas credenciales o crear manualmente desde Supabase.*

---

## Recursos de Referencia

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Next.js Integration](https://supabase.com/docs/guides/frameworks/nextjs)
