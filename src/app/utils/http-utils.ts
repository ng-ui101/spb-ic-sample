import {HttpParams} from "@angular/common/http";
import {IPaperSearchParams} from "../interfaces/papers";

export function setPapersFilterParams(params: IPaperSearchParams) {
    let httpParams = new HttpParams()
        .set('_page', params.page.toString())
        .set('_limit', params.limit.toString());

    if (params.sort) {
        httpParams = httpParams.append('_sort', params.sort).append('_order', params.order);
    }

    if (params.type) {
        httpParams = httpParams.append('type', params.type);
    }

    if (params.paperId) {
        httpParams = httpParams.append('paperId_like', params.paperId);
    }

    if (!params.showArchival) {
        httpParams = httpParams.append('isArchival_ne', true);
    }

    return httpParams;
}
