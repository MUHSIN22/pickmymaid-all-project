import cron from 'node-cron'
import { sendMail } from '../utils/sendMail/sendMail';
import { promotionalMailBody } from '../utils/mailBody/promotionalMail';
import path from 'path';
import { jobApplicationModel } from '../models/jobApplication/jobApplication.model';
import { CustomerModel } from '../models/users/customer.model';
import fs from 'fs';
import { logErrorWithSource } from '../config/logger';

const BATCH_SIZE = 20;
const DELAY_BETWEEN_BATCHES_MS = 5000; // 5 seconds      

const toBase64Image = (filePath: string, mimeType = 'image/png'): string => {
  const file = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${file.toString('base64')}`;
};

// You can load this dynamically from DB
const getDailyUserEmails = async (): Promise<string[]> => {
  return [
    'muhsinny333@gmail.com',
    'muhsinny22@gmail.com',
    // ...load from DB
  ];
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const sendDailyPromotions = async () => {
  try{
    console.log('starting of send')
    const emails = await getDailyUserEmails();
    const users = await CustomerModel.aggregate([
      {
        $lookup: {
          from: "Payments",
          localField: "user_id",
          foreignField: "user_id",
          as: "paymentInfo"
        }
      },
      {
        $match: {
          $or: [
            { "paymentInfo": { $eq: [] } }, // No payments
            {
              "paymentInfo": {
                $elemMatch: { status: { $in: [0, 3] } } // At least one with status 0 or 3
              }
            }
          ]
        }
      }
    ])
    if (!emails.length) return;
    const maids = await jobApplicationModel.find(
      {},
      { name: 1, salary: 1, nationality: 1, profile: 1, employmentHistory: 1, ref_number: 1 }
    )
    .sort({ updatedAt: -1, 'salary.from': -1 })
    .limit(4)

    const attachements = [
      {
        filename: 'logo.webp',
        path: path.resolve(__dirname, '../../public/assets/logo orange.webp'),
        cid: 'logo@pickmymaid',
        contentDisposition: 'inline'
      }
    ]

    maids.forEach((maid, index) => {
      let imageUrl: string = maid.profile as string;
    
      // Remove the '/images' prefix
      if (imageUrl.startsWith('images/')) {
        imageUrl = imageUrl.slice('images/'.length); // removes the `/images/`
      }
    
      // Get the actual file name with extension
      const fileName = path.basename(imageUrl);
    
      console.log(imageUrl)
      attachements.push({
        filename: fileName,
        path: path.resolve(__dirname, '../../public/uploads/' + imageUrl),
        cid: `maid${index}@image`,
        contentDisposition: 'inline'
      });
    });

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      console.log(`📤 Sending batch ${i / BATCH_SIZE + 1}: ${batch.length} emails`);

      await Promise.allSettled(
        batch.map(user => {
          if(!['pickmymaid@gmail.com','muhsinny333@gmail.com', 'muhsinny22@gmail.com'].includes(user.email)) return false
          const subject = `Hey ${capitalize(user.first_name)}, Your Perfect Maid/Nanny Awaits! 🧹`;
          const html = promotionalMailBody(maids, user.email);
          sendMail(user.email, subject, html, attachements)}
        )
      );

      if (i + BATCH_SIZE < emails.length) {
        await sleep(DELAY_BETWEEN_BATCHES_MS);
      }
    }

    console.log('✅ Daily promotional mail batch completed.');
  }catch(error: any){
    logErrorWithSource(error, null)
  }
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// 🕒 Schedule at 10:30 AM daily Dubai time
cron.schedule('* 20 * * *', sendDailyPromotions, {
  timezone: 'Asia/Dubai',
});
