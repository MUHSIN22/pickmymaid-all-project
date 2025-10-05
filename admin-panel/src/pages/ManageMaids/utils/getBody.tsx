import { jsonToFormData } from './JsontoformData';

export const getAddBody = (notes: any, files: any) => {
  let personalData: any = localStorage.getItem('personalData');
  let contactData: any = localStorage.getItem('contactData');
  let otherDetails: any = localStorage.getItem('otherDetails');
  let employmentHistory: any = localStorage.getItem('employmentHistory');
  let data: any = {
    ...JSON.parse(personalData),
    ...JSON.parse(contactData),
    ...JSON.parse(otherDetails),
    jobs: JSON.parse(employmentHistory),
    ...notes,
    files,
  };

  const imageBlob: any = data.imgName
    ? base64ToBlob(data?.img, data?.imgName)
    : false;
  let formDatabody = new FormData();

  // let worldFiles: any = {};

  let body = {
    name: data?.name,
    email: data?.email,
    mobile: data?.uaenumber,
    age: data?.age,
    marital_status: data?.maritalStatus,
    nationality: data?.nationality,
    location: data?.location,
    religion: data?.religion,
    salary: JSON.stringify({
      from: Number(data?.salaries[0]),
      to: Number(data?.salaries[1]),
    }),
    is_negotiable_salary: data?.is_negotiable_salary,
    uae_no: data?.uaenumber,
    available_from: data?.available_from,
    whatsapp_no: data?.whatsappnumber,
    botim_number: data?.botimnumber,
    date: data?.date,
    current_location: data?.clocation,
    visa_expire: data?.visa_expire,
    youtube_link: data?.ylink,
    visa_status: data?.visaStatus,
    availability: true,
    skills: JSON.stringify(data?.skills),
    language: JSON.stringify(data?.languages),
    employmentHistory: JSON.stringify(data?.jobs),
    option: data?.option,
    service: data?.service,
    education: data?.education,
    notes: data?.notes,
    day_of: data?.dayOff,
    references: true,
    status: 1,
  };
  formDatabody = jsonToFormData(body);
  console.log(data?.imgName?.name);
  console.log(
    `${data?.imgName?.name.split('.')[0]}.${
      data?.imgName?.type.split('/')[1] || 'png'
    }`
  );

  if (data?.files) {
    data?.files.map((item: any, index: number) => {
      console.log(item);
      let blob: any = base64ToBlob(item.file, {
        type: item.type,
        name: item.name,
      });
      formDatabody.append(`wordfiles[${index}]`, blob);
    });
  }
  if (imageBlob) {
    formDatabody.append(
      'profile',
      imageBlob,
      `${data?.imgName?.name.split('.')[0]}.${
        data?.imgName?.type.split('/')[1] || 'png'
      }`
    );
    formDatabody.append(
      'attach',
      imageBlob,
      `${data?.imgName?.name.split('.')[0]}.${
        data?.imgName?.type.split('/')[1] || 'png'
      }`
    );
  }

  console.log(formDatabody);
  return formDatabody;
};

function base64ToBlob(base64: string, details: any) {
  const parts = base64.split(';base64,');
  if (parts.length !== 2) {
    return false;
  }
  const byteCharacters = atob(parts[1]);
  const byteArrays = [];
  console.log(details);
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: details.type });
}
