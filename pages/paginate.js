import _ld from 'lodash'

export const paginate = (items,pageNumber,pageSize) => {
    const startIndex = (pageNumber-1) * pageSize
    return _ld(items).slice(startIndex).take(pageSize).value();
}