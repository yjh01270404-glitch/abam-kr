// src/lib/geo-coords.ts
// 서울 25개 자치구 및 수도권 주요 거점의 정밀 위도/경도 (Google Local SEO & Proximity 알고리즘 전용)

export type GeoLocation = {
  region: string;       // KR-11 (서울), KR-41 (경기), KR-28 (인천)
  placename: string;    // 행정구역 정식 명칭
  lat: number;          // 위도
  lng: number;          // 경도
};

export const REGIONAL_COORDS: Record<string, GeoLocation> = {
  // 서울 25개 자치구
  '강남': { region: 'KR-11', placename: '서울특별시 강남구', lat: 37.497952, lng: 127.027619 },
  '강남구': { region: 'KR-11', placename: '서울특별시 강남구', lat: 37.497952, lng: 127.027619 },
  '서초': { region: 'KR-11', placename: '서울특별시 서초구', lat: 37.483712, lng: 127.032411 },
  '서초구': { region: 'KR-11', placename: '서울특별시 서초구', lat: 37.483712, lng: 127.032411 },
  '송파': { region: 'KR-11', placename: '서울특별시 송파구', lat: 37.514575, lng: 127.105856 },
  '송파구': { region: 'KR-11', placename: '서울특별시 송파구', lat: 37.514575, lng: 127.105856 },
  '마포': { region: 'KR-11', placename: '서울특별시 마포구', lat: 37.566324, lng: 126.901614 },
  '마포구': { region: 'KR-11', placename: '서울특별시 마포구', lat: 37.566324, lng: 126.901614 },
  '용산': { region: 'KR-11', placename: '서울특별시 용산구', lat: 37.532600, lng: 126.990000 },
  '용산구': { region: 'KR-11', placename: '서울특별시 용산구', lat: 37.532600, lng: 126.990000 },
  '영등포': { region: 'KR-11', placename: '서울특별시 영등포구', lat: 37.526436, lng: 126.896204 },
  '영등포구': { region: 'KR-11', placename: '서울특별시 영등포구', lat: 37.526436, lng: 126.896204 },
  '성동': { region: 'KR-11', placename: '서울특별시 성동구', lat: 37.563456, lng: 127.036921 },
  '성동구': { region: 'KR-11', placename: '서울특별시 성동구', lat: 37.563456, lng: 127.036921 },
  '광진': { region: 'KR-11', placename: '서울특별시 광진구', lat: 37.538568, lng: 127.082386 },
  '광진구': { region: 'KR-11', placename: '서울특별시 광진구', lat: 37.538568, lng: 127.082386 },
  '동작': { region: 'KR-11', placename: '서울특별시 동작구', lat: 37.512402, lng: 126.939300 },
  '동작구': { region: 'KR-11', placename: '서울특별시 동작구', lat: 37.512402, lng: 126.939300 },
  '관악': { region: 'KR-11', placename: '서울특별시 관악구', lat: 37.478406, lng: 126.951559 },
  '관악구': { region: 'KR-11', placename: '서울특별시 관악구', lat: 37.478406, lng: 126.951559 },
  '서대문': { region: 'KR-11', placename: '서울특별시 서대문구', lat: 37.579116, lng: 126.936778 },
  '서대문구': { region: 'KR-11', placename: '서울특별시 서대문구', lat: 37.579116, lng: 126.936778 },
  '종로': { region: 'KR-11', placename: '서울특별시 종로구', lat: 37.573050, lng: 126.979400 },
  '종로구': { region: 'KR-11', placename: '서울특별시 종로구', lat: 37.573050, lng: 126.979400 },
  '중구': { region: 'KR-11', placename: '서울특별시 중구', lat: 37.563843, lng: 126.997602 },
  '동대문': { region: 'KR-11', placename: '서울특별시 동대문구', lat: 37.574363, lng: 127.039600 },
  '동대문구': { region: 'KR-11', placename: '서울특별시 동대문구', lat: 37.574363, lng: 127.039600 },
  '성북': { region: 'KR-11', placename: '서울특별시 성북구', lat: 37.589116, lng: 127.018215 },
  '성북구': { region: 'KR-11', placename: '서울특별시 성북구', lat: 37.589116, lng: 127.018215 },
  '강북': { region: 'KR-11', placename: '서울특별시 강북구', lat: 37.639610, lng: 127.025538 },
  '강북구': { region: 'KR-11', placename: '서울특별시 강북구', lat: 37.639610, lng: 127.025538 },
  '도봉': { region: 'KR-11', placename: '서울특별시 도봉구', lat: 37.668768, lng: 127.047163 },
  '도봉구': { region: 'KR-11', placename: '서울특별시 도봉구', lat: 37.668768, lng: 127.047163 },
  '노원': { region: 'KR-11', placename: '서울특별시 노원구', lat: 37.654200, lng: 127.056800 },
  '노원구': { region: 'KR-11', placename: '서울특별시 노원구', lat: 37.654200, lng: 127.056800 },
  '중랑': { region: 'KR-11', placename: '서울특별시 중랑구', lat: 37.606600, lng: 127.092700 },
  '중랑구': { region: 'KR-11', placename: '서울특별시 중랑구', lat: 37.606600, lng: 127.092700 },
  '강서': { region: 'KR-11', placename: '서울특별시 강서구', lat: 37.550937, lng: 126.849532 },
  '강서구': { region: 'KR-11', placename: '서울특별시 강서구', lat: 37.550937, lng: 126.849532 },
  '양천': { region: 'KR-11', placename: '서울특별시 양천구', lat: 37.516900, lng: 126.866500 },
  '양천구': { region: 'KR-11', placename: '서울특별시 양천구', lat: 37.516900, lng: 126.866500 },
  '구로': { region: 'KR-11', placename: '서울특별시 구로구', lat: 37.495400, lng: 126.887400 },
  '구로구': { region: 'KR-11', placename: '서울특별시 구로구', lat: 37.495400, lng: 126.887400 },
  '금천': { region: 'KR-11', placename: '서울특별시 금천구', lat: 37.456800, lng: 126.895500 },
  '금천구': { region: 'KR-11', placename: '서울특별시 금천구', lat: 37.456800, lng: 126.895500 },
  '은평': { region: 'KR-11', placename: '서울특별시 은평구', lat: 37.602700, lng: 126.929100 },
  '은평구': { region: 'KR-11', placename: '서울특별시 은평구', lat: 37.602700, lng: 126.929100 },
  '강동': { region: 'KR-11', placename: '서울특별시 강동구', lat: 37.530100, lng: 127.123800 },
  '강동구': { region: 'KR-11', placename: '서울특별시 강동구', lat: 37.530100, lng: 127.123800 },

  // 경기·인천 수도권 거점
  '수원': { region: 'KR-41', placename: '경기도 수원시', lat: 37.263573, lng: 127.028601 },
  '수원시': { region: 'KR-41', placename: '경기도 수원시', lat: 37.263573, lng: 127.028601 },
  '인천': { region: 'KR-28', placename: '인천광역시', lat: 37.456255, lng: 126.705206 },
  '인천광역시': { region: 'KR-28', placename: '인천광역시', lat: 37.456255, lng: 126.705206 },
  '분당': { region: 'KR-41', placename: '경기도 성남시 분당구', lat: 37.382698, lng: 127.118905 },
  '판교': { region: 'KR-41', placename: '경기도 성남시 분당구 판교', lat: 37.402056, lng: 127.106806 },
  '성남': { region: 'KR-41', placename: '경기도 성남시', lat: 37.438600, lng: 127.137800 },
  '일산': { region: 'KR-41', placename: '경기도 고양시 일산동구', lat: 37.658364, lng: 126.772535 },
  '고양': { region: 'KR-41', placename: '경기도 고양시', lat: 37.658364, lng: 126.772535 },
  '부천': { region: 'KR-41', placename: '경기도 부천시', lat: 37.503414, lng: 126.766031 },
  '부천시': { region: 'KR-41', placename: '경기도 부천시', lat: 37.503414, lng: 126.766031 },
  '안양': { region: 'KR-41', placename: '경기도 안양시', lat: 37.394253, lng: 126.956821 },
  '안양시': { region: 'KR-41', placename: '경기도 안양시', lat: 37.394253, lng: 126.956821 },
  '평택': { region: 'KR-41', placename: '경기도 평택시', lat: 36.992107, lng: 127.112945 },
  '평택시': { region: 'KR-41', placename: '경기도 평택시', lat: 36.992107, lng: 127.112945 },
  '동탄': { region: 'KR-41', placename: '경기도 화성시 동탄', lat: 37.199493, lng: 127.072792 },
  '화성': { region: 'KR-41', placename: '경기도 화성시', lat: 37.199493, lng: 127.072792 },
  '김포': { region: 'KR-41', placename: '경기도 김포시', lat: 37.615246, lng: 126.715732 },
  '김포시': { region: 'KR-41', placename: '경기도 김포시', lat: 37.615246, lng: 126.715732 },
  '용인': { region: 'KR-41', placename: '경기도 용인시', lat: 37.241086, lng: 127.177553 },
};

// 키워드 문자열에서 가장 적합한 위치 좌표 탐색
export function findGeoLocation(keyword: string): GeoLocation {
  for (const [key, loc] of Object.entries(REGIONAL_COORDS)) {
    if (keyword.includes(key)) {
      return loc;
    }
  }
  // 기본값: 서울특별시 중심 (서울시청 기준)
  return {
    region: 'KR-11',
    placename: '서울특별시',
    lat: 37.566535,
    lng: 126.977969
  };
}
