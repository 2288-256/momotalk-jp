import axios from 'axios'
import { myStudent } from './interface'

const getSchaleImg = (collection: string) => {
    return `https://schale.gg/images/student/collection/${collection}.webp`
}

const getData = async (file: string) => {
    let data: any[] = []
    await axios.get(file).then((res) => (data = res.data))
    return data
}

const getSchale = async () => {
    const local = await getData('/momotalk-jp/students.json')
    const schale = await getData('https://schale.gg/data/jp/students.min.json')
    const results: myStudent[] = []
    for (const schaleItem of schale) {
        const newStudent: myStudent = {
            Id: schaleItem.Id,
            Name: schaleItem.Name,
            Birthday: schaleItem.Birthday,
            Avatar: [getSchaleImg(schaleItem.CollectionTexture)],
            Bio: '',
            Nickname: [schaleItem.PathName],
            School: schaleItem.School,
            cnt: 0
        }
        const localItem = local.find((ele) => ele.Id === newStudent.Id)
        if (localItem) {
            newStudent.Avatar = newStudent.Avatar.concat(localItem.Avatar)
            newStudent.Bio = localItem.Bio
            newStudent.Nickname = newStudent.Nickname.concat(localItem.Nickname)
        }
        results.push(newStudent)
    }
    return results
}

const getLocal = async () => {
    const local = await getData('/momotalk-jp/students2.json')
    const results: myStudent[] = []
    for (const localItem of local) {
        const newStudent: myStudent = {
            Id: localItem.Id,
            Name: localItem.Name,
            Birthday: '???',
            Avatar: ['/momotalk-jp/Avatars/' + localItem.Nickname[0] + '.webp'],
            Bio: localItem.Bio,
            Nickname: localItem.Nickname,
            School: '',
            cnt: 0
        }
        newStudent.Avatar = newStudent.Avatar.concat(localItem.Avatar)
        results.push(newStudent)
    }
    return results
}

const getStudents = async () => {
    const data1: myStudent[] = await getSchale()
    const data2: myStudent[] = await getLocal()
    return [data1, data2]
}

export { getStudents }
