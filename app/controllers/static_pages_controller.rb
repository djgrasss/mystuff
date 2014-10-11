class StaticPagesController < ApplicationController
  def stuff
  end

  def home
  end

  def help
  end

  def team
    @team = [
        {image:"team/photo-jiefeng.png",
         name: "Jie Feng",
         role: "Co-Founder & Chairman",
         email: "jiefeng.hopkins@gmail.com",
         education: "The Johns Hopkins University",
         intro: "Tech engine, Management"
        },
        {image:"team/pengjianxiang.jpg",
         name: "Jianxiang Peng",
         role: "Co-Founder",
         email: "pjx911@gmail.com",
         education: "The Johns Hopkins University",
         intro: "Backend, Android & IOS"
        },
        {image:"team/photo-scottzhang.png",
         name: "Scott Zhang",
         role: "Co-Founder",
         email: "scott.likai.zhang@gmail.com",
         education: "The Johns Hopkins University",
         intro: "Frontend, Backend"
        },
        {image:"team/photo-chenzhenwu.jpg",
         name: "Chenzhen Wu",
         role: "Co-Founder",
         email: "chzhen.wu@hotmail.com",
         education: "École Polytechnique Fédérale de Lausanne",
         intro: "Backend, Strategy"
        },
        {image:"team/photo-chunxiao.jgp",
         name: "Chunxiao Song",
         role: "Co-Founder",
         email: "songchunxiao.jhu@gmail.com",
         education: "The Johns Hopkins University",
         department: "Bloomberg School of Public Health",
         intro: "Design, Marketing"
        }
    ]
  end

  def contact
  end

  def test
  end
  def find_surrogacy
  end
  def register
  end
end
