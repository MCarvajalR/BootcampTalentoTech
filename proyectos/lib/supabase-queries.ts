'use server'

import { createClient } from '@/lib/supabase/server'

// EXERCISES QUERIES
export async function fetchExercisesBySubject(subject: string, difficulty?: string) {
  const supabase = await createClient()
  
  let query = supabase
    .from('exercises')
    .select('*')
    .eq('subject', subject)
  
  if (difficulty) {
    query = query.eq('difficulty', difficulty)
  }
  
  const { data, error } = await query.limit(10)
  
  if (error) {
    console.error('Error fetching exercises:', error)
    return []
  }
  
  return data || []
}

export async function fetchExerciseById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching exercise:', error)
    return null
  }
  
  return data
}

// STUDENT QUERIES
export async function fetchOrCreateStudent(userId: string) {
  const supabase = await createClient()
  
  // Verificar si el estudiante existe
  let { data: student, error: fetchError } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching student:', fetchError)
    return null
  }
  
  return student
}

export async function updateStudentProfile(userId: string, updates: any) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating student:', error)
    return null
  }
  
  return data
}

export async function fetchStudentStats(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching student stats:', error)
    return null
  }
  
  return data
}

// ACHIEVEMENTS QUERIES
export async function fetchStudentAchievements(studentId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('student_id', studentId)
    .order('earned_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
  
  return data || []
}

export async function addAchievement(studentId: string, achievement: any) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('achievements')
    .insert([
      {
        student_id: studentId,
        title: achievement.title,
        description: achievement.description,
        icon_type: achievement.icon_type,
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error('Error adding achievement:', error)
    return null
  }
  
  return data
}

// STUDENT ANSWERS QUERIES
export async function saveStudentAnswer(studentId: string, exerciseId: string, answer: any) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('student_answers')
    .insert([
      {
        student_id: studentId,
        exercise_id: exerciseId,
        student_answer: answer.answer,
        is_correct: answer.is_correct,
        time_spent_seconds: answer.time_spent_seconds,
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error('Error saving answer:', error)
    return null
  }
  
  return data
}

export async function fetchStudentAnswers(studentId: string, limit = 20) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('student_answers')
    .select('*')
    .eq('student_id', studentId)
    .order('answered_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching student answers:', error)
    return []
  }
  
  return data || []
}

// CHAT MESSAGES QUERIES
export async function saveChatMessage(studentId: string, message: string, role: 'student' | 'tutor', subject?: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      {
        student_id: studentId,
        message: message,
        role: role,
        subject_context: subject,
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error('Error saving chat message:', error)
    return null
  }
  
  return data
}

export async function fetchChatHistory(studentId: string, limit = 50) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: true })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching chat history:', error)
    return []
  }
  
  return data || []
}

// PRODUCT DATA QUERIES
export async function fetchProductData(subject?: string, gradeLevel?: number) {
  const supabase = await createClient()
  
  let query = supabase.from('product_data').select('*')
  
  if (subject) {
    query = query.eq('subject', subject)
  }
  
  if (gradeLevel) {
    query = query.eq('grade_level', gradeLevel)
  }
  
  const { data, error } = await query.limit(20)
  
  if (error) {
    console.error('Error fetching product data:', error)
    return []
  }
  
  return data || []
}

export async function fetchProductDataById(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('product_data')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching product data:', error)
    return null
  }
  
  return data
}

// TEACHER QUERIES
export async function fetchOrCreateTeacher(userId: string) {
  const supabase = await createClient()
  
  let { data: teacher, error: fetchError } = await supabase
    .from('teachers')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching teacher:', fetchError)
    return null
  }
  
  return teacher
}

export async function updateTeacherProfile(userId: string, updates: any) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('teachers')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating teacher:', error)
    return null
  }
  
  return data
}
