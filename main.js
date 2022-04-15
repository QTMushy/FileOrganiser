let fs = require("fs");
let path = require("path");

let input = process.argv.slice(2);

let command = input[0];

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


switch(command)
{
	case "tree":
		treefn(input[1]);
		break;
	case "organize":
		organizefn(input[1])
		break;
	case "help":
		helpfn()
		break;
	default:
		console.log("Please Enter Valid Command")
		break;
}
function organizefn(dirpath)
{
	if(dirpath==undefined)
	{
		console.log("Please Enter Path");
	}
	else
	{
		let distPath = path.join(dirpath,"OrganizedFolder");
		if(fs.existsSync(distPath) == false)
		{
			fs.mkdirSync(distPath);

		}

		// let files = fs.readdirSync(dirpath);
		organizefnHelper(dirpath,distPath);

	}

}
function hello()
{
	return `hello`
}
function organizefnHelper(src,dest)
{
	let files = fs.readdirSync(src);

	for(let i=0;i<files.length;i++)
	{
		let childAddress = path.join(src,files[i]);
		let isFile = fs.lstatSync(childAddress).isFile();
		if(isFile)
		{
			let catagory = getCatagory(files[i]);
			sendFiles(childAddress,dest,catagory)
			//console.log(catagory)
		}
	}
}

function getCatagory(file)
{
	let ext = path.extname(file);
	ext = ext.slice(1);
	for(let type in types)
	{
		for(let i=0;i<type.length;i++)
		{
			if(ext == type[i])
			{
				return type;
			}
		}
	}
	return "others"
}

function sendFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);

}

console.log(command);