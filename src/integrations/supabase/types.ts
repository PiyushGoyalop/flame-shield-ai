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
      api_predictions: {
        Row: {
          air_quality_index: number | null
          barren_percent: number | null
          co2_level: number | null
          created_at: string
          drought_index: number | null
          forest_percent: number | null
          grassland_percent: number | null
          humidity: number | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          pm10: number | null
          pm2_5: number | null
          probability: number | null
          temperature: number | null
          updated_at: string
          urban_percent: number | null
          user_id: string
          vegetation_evi: number | null
          vegetation_ndvi: number | null
          water_percent: number | null
        }
        Insert: {
          air_quality_index?: number | null
          barren_percent?: number | null
          co2_level?: number | null
          created_at?: string
          drought_index?: number | null
          forest_percent?: number | null
          grassland_percent?: number | null
          humidity?: number | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          pm10?: number | null
          pm2_5?: number | null
          probability?: number | null
          temperature?: number | null
          updated_at?: string
          urban_percent?: number | null
          user_id: string
          vegetation_evi?: number | null
          vegetation_ndvi?: number | null
          water_percent?: number | null
        }
        Update: {
          air_quality_index?: number | null
          barren_percent?: number | null
          co2_level?: number | null
          created_at?: string
          drought_index?: number | null
          forest_percent?: number | null
          grassland_percent?: number | null
          humidity?: number | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          pm10?: number | null
          pm2_5?: number | null
          probability?: number | null
          temperature?: number | null
          updated_at?: string
          urban_percent?: number | null
          user_id?: string
          vegetation_evi?: number | null
          vegetation_ndvi?: number | null
          water_percent?: number | null
        }
        Relationships: []
      }
      predictions: {
        Row: {
          co2_level: number
          created_at: string
          drought_index: number
          humidity: number
          id: string
          location: string
          probability: number
          temperature: number
          user_id: string
        }
        Insert: {
          co2_level: number
          created_at?: string
          drought_index: number
          humidity: number
          id?: string
          location: string
          probability: number
          temperature: number
          user_id: string
        }
        Update: {
          co2_level?: number
          created_at?: string
          drought_index?: number
          humidity?: number
          id?: string
          location?: string
          probability?: number
          temperature?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          mobile: string | null
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          mobile?: string | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          mobile?: string | null
          name?: string | null
          updated_at?: string
        }
        Relationships: []
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
