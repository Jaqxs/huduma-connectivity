export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          created_at: string
          customer_id: string | null
          id: string
          price: number
          professional_id: string | null
          service_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          created_at?: string
          customer_id?: string | null
          id?: string
          price: number
          professional_id?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          created_at?: string
          customer_id?: string | null
          id?: string
          price?: number
          professional_id?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          is_verified: boolean | null
          location: string | null
          phone: string | null
          profession: string | null
          role: string
          updated_at: string
          verification_date: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          location?: string | null
          phone?: string | null
          profession?: string | null
          role?: string
          updated_at?: string
          verification_date?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          phone?: string | null
          profession?: string | null
          role?: string
          updated_at?: string
          verification_date?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          customer_id: string | null
          id: string
          rating: number
          service_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          rating: number
          service_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          rating?: number
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_available_dates: {
        Row: {
          created_at: string
          date_available: string
          id: string
          service_id: string | null
          slots: string[]
        }
        Insert: {
          created_at?: string
          date_available: string
          id?: string
          service_id?: string | null
          slots: string[]
        }
        Update: {
          created_at?: string
          date_available?: string
          id?: string
          service_id?: string | null
          slots?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "service_available_dates_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_features: {
        Row: {
          feature: string
          id: string
          service_id: string | null
        }
        Insert: {
          feature: string
          id?: string
          service_id?: string | null
        }
        Update: {
          feature?: string
          id?: string
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_features_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_primary: boolean | null
          service_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          service_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_images_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string | null
          estimated_time: string | null
          featured_until: string | null
          id: string
          is_featured: boolean | null
          location: string
          price: number
          professional_id: string | null
          rating: number | null
          rating_count: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          estimated_time?: string | null
          featured_until?: string | null
          id?: string
          is_featured?: boolean | null
          location: string
          price: number
          professional_id?: string | null
          rating?: number | null
          rating_count?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          estimated_time?: string | null
          featured_until?: string | null
          id?: string
          is_featured?: boolean | null
          location?: string
          price?: number
          professional_id?: string | null
          rating?: number | null
          rating_count?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          payment_id: string | null
          plan: string
          starts_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan: string
          starts_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          payment_id?: string | null
          plan?: string
          starts_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          appointment_id: string | null
          created_at: string
          description: string | null
          id: string
          method: string | null
          recipient_id: string | null
          reference: string | null
          service_id: string | null
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          amount: number
          appointment_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          method?: string | null
          recipient_id?: string | null
          reference?: string | null
          service_id?: string | null
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          appointment_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          method?: string | null
          recipient_id?: string | null
          reference?: string | null
          service_id?: string | null
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
