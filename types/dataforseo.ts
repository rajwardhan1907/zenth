export type DFSResponse<T> = {
  version: string
  status_code: number
  status_message: string
  time: string
  cost: number
  tasks_count: number
  tasks_error: number
  tasks: DFSTask<T>[]
}

export type DFSTask<T> = {
  id: string
  status_code: number
  status_message: string
  time: string
  cost: number
  result_count: number
  path: string[]
  data: Record<string, unknown>
  result: T[] | null
}

export type KeywordData = {
  keyword: string
  location_code: number
  language_code: string
  search_partners: boolean
  competition: number | null
  competition_level: string | null
  cpc: number | null
  search_volume: number | null
  low_top_of_page_bid: number | null
  high_top_of_page_bid: number | null
  monthly_searches: MonthlySearch[] | null
}

export type MonthlySearch = {
  year: number
  month: number
  search_volume: number
}

export type RelatedKeyword = {
  se_type: string
  seed_keyword: string
  seed_keyword_data: KeywordData | null
  location_code: number
  language_code: string
  total_count: number
  items_count: number
  items: RelatedKeywordItem[]
}

export type RelatedKeywordItem = {
  type: string
  se_type: string
  keyword: string
  location_code: number
  language_code: string
  keyword_info: KeywordData | null
  keyword_properties: {
    se_type: string
    core_keyword: string | null
    synonym_clustering_algorithm: string
    keyword_difficulty: number | null
    detected_language: string
    is_another_language: boolean
  } | null
  serp_info: {
    se_type: string
    check_url: string
    serp_item_types: string[]
    se_results_count: number
    last_updated_time: string
    previous_updated_time: string
  } | null
}

export type CompetitorKeywordItem = {
  keyword: string
  location_code: number
  language_code: string
  items: {
    type: string
    se_type: string
    rank_group: number
    rank_absolute: number
    domain: string
    title: string
    description: string
    url: string
  }[]
  keyword_info: KeywordData | null
}

export type DFSError = {
  code: number
  message: string
  endpoint: string
  retryable: boolean
}
