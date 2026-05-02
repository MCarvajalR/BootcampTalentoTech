// Mock data for EduCampo IA demo

export const subjects = [
  {
    id: 'matematicas',
    name: 'Matematicas',
    icon: 'Calculator',
    color: 'bg-sky-500',
    progress: 65,
    description: 'Suma, resta, multiplicacion y mas',
    totalLessons: 20,
    completedLessons: 13,
  },
  {
    id: 'lectura',
    name: 'Lectura',
    icon: 'BookOpen',
    color: 'bg-amber-500',
    progress: 40,
    description: 'Comprension lectora y escritura',
    totalLessons: 15,
    completedLessons: 6,
  },
  {
    id: 'ciencias',
    name: 'Ciencias Naturales',
    icon: 'Leaf',
    color: 'bg-green-500',
    progress: 25,
    description: 'Plantas, animales y el medio ambiente',
    totalLessons: 18,
    completedLessons: 4,
  },
];

export const achievements = [
  { id: 1, name: 'Primer paso', description: 'Completa tu primera leccion', icon: 'Star', unlocked: true },
  { id: 2, name: 'Matematico', description: 'Resuelve 10 problemas de matematicas', icon: 'Trophy', unlocked: true },
  { id: 3, name: 'Lector veloz', description: 'Lee 5 cuentos completos', icon: 'Zap', unlocked: true },
  { id: 4, name: 'Explorador', description: 'Aprende sobre 3 animales diferentes', icon: 'Compass', unlocked: false },
  { id: 5, name: 'Racha de 7 dias', description: 'Estudia 7 dias seguidos', icon: 'Flame', unlocked: false },
  { id: 6, name: 'Cientifico junior', description: 'Completa todas las lecciones de ciencias', icon: 'Award', unlocked: false },
];

export const avatars = [
  { id: 'vaca', name: 'Vaquita', emoji: 'cow' },
  { id: 'gallina', name: 'Pollita', emoji: 'chicken' },
  { id: 'caballo', name: 'Caballito', emoji: 'horse' },
  { id: 'cerdo', name: 'Cerdito', emoji: 'pig' },
  { id: 'oveja', name: 'Ovejita', emoji: 'sheep' },
  { id: 'perro', name: 'Perrito', emoji: 'dog' },
];

export const exercises = {
  matematicas: [
    {
      id: 1,
      type: 'multiple',
      difficulty: 'facil',
      question: 'Don Pedro tiene 5 gallinas y nacen 3 pollitos. Cuantos animales tiene ahora?',
      options: ['6', '7', '8', '9'],
      correct: 2,
      hint: 'Suma las gallinas con los pollitos',
    },
    {
      id: 2,
      type: 'multiple',
      difficulty: 'facil',
      question: 'Maria recoge 12 naranjas y regala 4 a su vecina. Cuantas naranjas le quedan?',
      options: ['6', '7', '8', '9'],
      correct: 2,
      hint: 'Resta las naranjas que regalo',
    },
    {
      id: 3,
      type: 'multiple',
      difficulty: 'medio',
      question: 'Si cada vaca da 5 litros de leche y hay 4 vacas, cuantos litros se recogen en total?',
      options: ['15', '18', '20', '25'],
      correct: 2,
      hint: 'Multiplica los litros por el numero de vacas',
    },
    {
      id: 4,
      type: 'multiple',
      difficulty: 'medio',
      question: 'En la finca hay 24 gallinas divididas en 4 corrales iguales. Cuantas gallinas hay en cada corral?',
      options: ['4', '5', '6', '8'],
      correct: 2,
      hint: 'Divide el total entre los corrales',
    },
    {
      id: 5,
      type: 'multiple',
      difficulty: 'dificil',
      question: 'Un agricultor siembra 8 filas de maiz con 12 plantas cada una. Cuantas plantas sembró en total?',
      options: ['86', '96', '106', '84'],
      correct: 1,
      hint: 'Multiplica las filas por las plantas de cada fila',
    },
  ],
  lectura: [
    {
      id: 1,
      type: 'multiple',
      difficulty: 'facil',
      question: 'Lee: "El sol brilla en el campo". Que brilla en el campo?',
      options: ['La luna', 'El sol', 'Las estrellas', 'El rio'],
      correct: 1,
      hint: 'Lee de nuevo la oracion con atencion',
    },
    {
      id: 2,
      type: 'multiple',
      difficulty: 'medio',
      question: 'Lee: "La vaca Lola come pasto verde en la pradera". Donde come pasto la vaca?',
      options: ['En el establo', 'En el rio', 'En la pradera', 'En la casa'],
      correct: 2,
      hint: 'Busca el lugar mencionado en la oracion',
    },
    {
      id: 3,
      type: 'multiple',
      difficulty: 'medio',
      question: 'Que palabra rima con "flor"?',
      options: ['Mesa', 'Amor', 'Casa', 'Perro'],
      correct: 1,
      hint: 'Busca una palabra que termine igual que flor',
    },
  ],
  ciencias: [
    {
      id: 1,
      type: 'multiple',
      difficulty: 'facil',
      question: 'Que necesitan las plantas para crecer?',
      options: ['Solo tierra', 'Agua, luz y tierra', 'Solo agua', 'Solo luz'],
      correct: 1,
      hint: 'Las plantas necesitan varias cosas para vivir',
    },
    {
      id: 2,
      type: 'multiple',
      difficulty: 'medio',
      question: 'Cual de estos animales es un mamifero?',
      options: ['Gallina', 'Rana', 'Vaca', 'Pez'],
      correct: 2,
      hint: 'Los mamiferos tienen pelo y alimentan a sus crias con leche',
    },
    {
      id: 3,
      type: 'multiple',
      difficulty: 'dificil',
      question: 'Que parte de la planta absorbe el agua del suelo?',
      options: ['Las hojas', 'El tallo', 'La raiz', 'La flor'],
      correct: 2,
      hint: 'Esta parte de la planta esta bajo la tierra',
    },
  ],
};

export const chatMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hola! Soy tu profesor virtual. Estoy aqui para ayudarte a aprender. Que te gustaria estudiar hoy?',
    timestamp: new Date(Date.now() - 60000),
  },
];

export const chatResponses = [
  'Muy bien! Esa es una excelente pregunta. Dejame explicarte...',
  'Perfecto! Vamos a aprender juntos sobre esto.',
  'Me alegra que preguntes! Mira, es asi...',
  'Excelente pregunta! Piensa en esto como si estuvieras en la finca...',
  'Muy interesante! Voy a darte un ejemplo del campo para que lo entiendas mejor.',
];

export const studentProfile = {
  name: 'Estudiante',
  avatar: 'vaca',
  grade: 3,
  streak: 5,
  totalExercises: 47,
  correctAnswers: 38,
  studyTime: 120, // minutes
  joinDate: new Date(2024, 0, 15),
};

export const grades = [
  { value: 1, label: 'Primero de Primaria' },
  { value: 2, label: 'Segundo de Primaria' },
  { value: 3, label: 'Tercero de Primaria' },
  { value: 4, label: 'Cuarto de Primaria' },
  { value: 5, label: 'Quinto de Primaria' },
];
